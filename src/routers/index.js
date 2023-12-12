import express from 'express';
import OrdersRouter from './orders.router.js';
import AuthRouter from './auth.router.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/orders', OrdersRouter);

export default router;
