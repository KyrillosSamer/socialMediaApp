import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  
  if (!result.success) {
    // نستخدم format() أو issues للحصول على رسائل الخطأ بشكل نظيف
    return res.status(400).json({ 
        message: "Validation failed",
        errors: result.error.issues.map(issue => ({
            path: issue.path[0],
            message: issue.message
        }))
    });
  }
  next();
};