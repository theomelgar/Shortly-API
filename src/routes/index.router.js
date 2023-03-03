import { Router } from 'express';
import loginRouter from './users.router.js'

const router = Router();

router.use('/', loginRouter);

export default router;
