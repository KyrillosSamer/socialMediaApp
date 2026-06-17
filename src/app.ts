import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './shared/error.middleware';
import { registerAuthRoutes } from './modules/auth/auth.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// تسجيل كل الـ Routes هنا
registerAuthRoutes(app);

// الـ Error Handler لازم يكون آخر حاجة، بعد كل الـ Routes
app.use(errorHandler);

export default app;