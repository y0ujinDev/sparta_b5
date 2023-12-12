import express from 'express';
import OrderRouter from './orders.router.js';

const router = express.Router();

router.use('/orders', OrderRouter);

export default router;
