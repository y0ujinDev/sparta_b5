import express from 'express';
import { RestaurantReviewsController } from '../controllers/user.reviews.controller.js';

const router = express.Router();

const restaurantReviewsController = new RestaurantReviewsController();
// 전체 리뷰 조회
router.get(
  '/restaurants/:restaurantId/reviews',
  restaurantReviewsController.getAllReviews,
);

export default router;
