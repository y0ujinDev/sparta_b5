import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { ReviewsController } from '../controllers/reviews.controller.js';
import { ReviewsService } from '../services/reviews.services.js';
import { ReviewsRepository } from '../repositories/reviews.repository.js';
import needSignin from '../middlewares/needSignin.middleware.js';

const router = express.Router();

const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);

//리뷰생성
router.post('/:orderId/reviews', needSignin, reviewsController.createReview);
// 내 전체 리뷰조회
router.get(
  '/orderId/reviews/me',
  needSignin,
  reviewsController.getAllMyReviews,
);
// 리뷰수정
router.put(
  '/:orderId/reviews/:reviewId',
  needSignin,
  reviewsController.updateReview,
);
// 리뷰삭제
router.patch(
  '/:orderId/reviews/:reviewId',
  needSignin,
  reviewsController.deleteReview,
);
// 전체 리뷰 조회
router.get(
  '/restaurants/:restaurantId/reviews',
  reviewsController.getAllReviews,
);
export default router;
