// src/shared/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
}

export const errorHandler = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('🔥 Error:', err.message);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // نظهر الـ stack بس في development عشان أمان الـ production
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};