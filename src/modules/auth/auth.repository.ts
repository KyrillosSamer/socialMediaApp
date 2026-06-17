import { User } from '../user/user.model';

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email }).select('+refreshToken');
};

export const createUser = async (userData: { name: string; email: string; password: string }) => {
    const newUser = new User(userData);
    return await newUser.save();
};

export const updateRefreshToken = async (userId: string, refreshToken: string | null) => {
    return await User.findByIdAndUpdate(userId, { refreshToken });
};

export const findUserById = async (userId: string) => {
    return await User.findById(userId).select('+refreshToken');
};

export const updatePassword = async (userId: string, hashedPassword: string) => {
    return await User.findByIdAndUpdate(userId, { password: hashedPassword });
};