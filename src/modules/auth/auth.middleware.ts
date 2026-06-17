import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;

interface JwtPayload {
    userId: string;
}

// نوسّع نوع Request بتاع Express عشان نضيف خاصية user
// كده أي route بعد الـ middleware ده يقدر يقرا req.user
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "No token provided, access denied" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};