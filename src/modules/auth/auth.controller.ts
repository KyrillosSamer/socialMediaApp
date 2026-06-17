import { Request, Response } from 'express';
import * as authService from './auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUser(req.body);
        res.status(200).json({
            message: "Login successful",
            ...result,
        });
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const getMe = async (req: Request, res: Response) => {
    res.status(200).json({ user: req.user });
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken: token } = req.body;
        const tokens = await authService.refreshAccessToken(token);
        res.status(200).json(tokens);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        await authService.logoutUser(userId);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        await authService.changePassword(userId, req.body);
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};