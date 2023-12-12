import express from 'express';
import OrdersRouter from './orders.router.js';

const router = express.Router();

router.use('/orders', OrdersRouter);

export default router;
