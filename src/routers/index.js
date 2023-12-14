import OrdersRouter from './orders.router.js';
import express from 'express'
import { restaurantMenusRouter } from './restaurantMenus.router.js';
import { restaurantRouter } from './restaurant.router.js';


const router = express.Router();

router.use('/orders', OrdersRouter);
router.use('/restaurants/menus', restaurantMenusRouter);
router.use('/restaurants', restaurantRouter);

export default router;
