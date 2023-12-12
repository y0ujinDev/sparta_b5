import OrdersRouter from './orders.router.js';
import express from 'express'
import { menusRouter } from './restaurantMenus.router.js';



const router = express.Router();

router.use('/orders', OrdersRouter);
router.use('/restaurants/menus', menusRouter);

export default router;
