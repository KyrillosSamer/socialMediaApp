import { Router, Application } from 'express';
import * as authController from './auth.controller';
import { validate } from '../../shared/validate.middleware';
import { protect } from './auth.middleware';
import { registerSchema, loginSchema, refreshTokenSchema, changePasswordSchema } from './auth.validation';




const router = Router();

// أضف هذا السطر للتأكد قبل تسجيل المسارات
if (!loginSchema) {
    throw new Error("تنبيه: loginSchema مفقودة! تأكد من ملف auth.validation.ts");
}

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', protect, authController.getMe);
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken);
router.post('/logout', protect, authController.logout);
router.post('/change-password', protect, validate(changePasswordSchema), authController.changePassword);


// طباعة المسارات للتأكد
console.log("مسارات الـ Auth المسجلة:");
router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        // نستخدم as any لتجاوز قيد الـ TypeScript
        const methods = (r.route as any).methods; 
        console.log(`- ${Object.keys(methods).join(', ').toUpperCase()} /api/auth${r.route.path}`);
    }
});

export const registerAuthRoutes = (app: Application) => {
    app.use('/api/auth', router);
};