import express from 'express';
import OrdersRouter from './orders.router.js';
import { Router } from 'express';
import { menusRouter } from './menus.router.js';



const router = express.Router();

router.use('/orders', OrdersRouter);

export default router;
