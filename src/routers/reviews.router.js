import express from 'express';
import { ReviewsController } from '../controllers/review.controller.js';

const router = express.Router();

const reviewsController = new ReviewsController();

// /orders/:orderId/reviews 공통부분

// 전체 리뷰 조회
router.get(
  '/restaurants/:restaurantId/reviews',
  reviewsController.getAllReviews,
);

// 로그인 미들웨어추가
//리뷰생성
router.post('/orders/:orderId/reviews', reviewsController.createReview);
// 내 리뷰조회
router.get('/orders/:orderId/reviews/me', reviewsController.getAllMyReviews);
// 리뷰수정
router.put(
  '/orders/:orderId/reviews/:reviewId',
  reviewsController.updateReview,
);
// 리뷰삭제
router.patch(
  '/orders/:orderId/reviews/:reviewId',
  reviewsController.deleteReview,
);
export default router;
