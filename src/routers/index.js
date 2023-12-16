import express from 'express';
import UsersRouter from './user.router.js';
import OrdersRouter from './orders.router.js';
import ReviewsRouter from './reviews.router.js';
import AuthRouter from './auth.router.js';
import { restaurantMenusRouter } from './restaurantMenus.router.js';
import { restaurantRouter } from './restaurant.router.js';
import cartsRouter from './carts.router.js';
import FindRestaurantRouter from './find.restaurants.router.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/users', UsersRouter);
router.use('/orders', OrdersRouter);
router.use('/carts', cartsRouter);
router.use('/orders', ReviewsRouter);
router.use('/restaurants/:restaurantId/menus', restaurantMenusRouter);
router.use('/restaurants', restaurantRouter);
router.use('/restaurants', FindRestaurantRouter);

export default router;
