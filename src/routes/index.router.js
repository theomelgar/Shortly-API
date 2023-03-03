import { Router } from 'express';
import usersRouter from './users.router.js'
import urlRouter from './url.router.js'
const router = Router();

router.use(usersRouter);
router.use(urlRouter);

export default router;
