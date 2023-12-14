import express from 'express'
import OrdersRouter from './orders.router.js';
import AuthRouter from './auth.router.js';
import { restaurantMenusRouter } from './restaurantMenus.router.js';
import { restaurantRouter } from './restaurant.router.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/orders', OrdersRouter);
router.use('/restaurants/menus', restaurantMenusRouter);
router.use('/restaurants', restaurantRouter);

export default router;
