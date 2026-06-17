import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authRepository from './auth.repository';
import { RegisterInput, LoginInput, ChangePasswordInput } from './auth.validation';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;

const generateTokens = (userId: string) => {
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

export const registerUser = async (userData: RegisterInput) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error("Email is already registered");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    try {
        return await authRepository.createUser({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });
    } catch (error: any) {
        if (error.code === 11000) {
            throw new Error("Email is already registered");
        }
        throw error;
    }
};

export const loginUser = async (credentials: LoginInput) => {
    const user = await authRepository.findUserByEmail(credentials.email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());
    await authRepository.updateRefreshToken(user._id.toString(), refreshToken);

    return {
        user: { id: user._id, name: user.name, email: user.email },
        accessToken,
        refreshToken,
    };
};

export const refreshAccessToken = async (refreshToken: string) => {
    let decoded: { userId: string };

    try {
        decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
    } catch (error) {
        throw new Error("Invalid or expired refresh token");
    }

    const user = await authRepository.findUserById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id.toString());
    await authRepository.updateRefreshToken(user._id.toString(), newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
};

export const logoutUser = async (userId: string) => {
    await authRepository.updateRefreshToken(userId, null);
};

export const changePassword = async (userId: string, data: ChangePasswordInput) => {
    const user = await authRepository.findUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const isOldPasswordValid = await bcrypt.compare(data.oldPassword, user.password);
    if (!isOldPasswordValid) {
        throw new Error("Old password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.newPassword, salt);
    await authRepository.updatePassword(userId, hashedPassword);

    await authRepository.updateRefreshToken(userId, null);
};