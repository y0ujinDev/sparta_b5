import express from 'express';
import OrdersRouter from './orders.router.js';
import UserReviewsRouter from './user.reviews.router.js';
import RestaurantReviewsRouter from './restaurant.reviews.router.js';
import AuthRouter from './auth.router.js';
import { restaurantMenusRouter } from './restaurantMenus.router.js';
import { restaurantRouter } from './restaurant.router.js';
import FindRestaurantRouter from './find.restaurants.router.js';

const router = express.Router();

router.use('/', AuthRouter);
router.use('/orders', OrdersRouter);
router.use('/orders', UserReviewsRouter);
router.use('/restaurants', RestaurantReviewsRouter);
router.use('/restaurants/menus', restaurantMenusRouter);
router.use('/restaurants', restaurantRouter);
router.use('/restaurants', FindRestaurantRouter);

export default router;
