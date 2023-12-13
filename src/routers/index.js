import express from 'express';
import OrdersRouter from './orders.router.js';
import UserReviewsRouter from './user.reviews.router.js';
import RestaurantReviewsRouter from './restaurant.reviews.router.js';

const router = express.Router();

router.use('/orders', OrdersRouter);
router.use('/orders', UserReviewsRouter);
router.use('/restaurants', RestaurantReviewsRouter);

export default router;
