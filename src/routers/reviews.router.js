import express from 'express';
import { ReviewsController } from '../controllers/review.controller.js';

const router = express.Router();

const reviewsController = new ReviewsController();

// /restaurants/:restaurantId 공통부분

// 전체 리뷰 조회
router.get(
  '/restaurants/:restaurantId/reviews',
  reviewsController.getAllReviews,
);

// 로그인 미들웨어추가
//리뷰생성
router.post(
  '/restaurants/:restaurantId/reviews',
  reviewsController.createReviews,
);
// 내 리뷰조회
router.get(
  '/restaurants/:restaurantId/reviews/me',
  reviewsController.getAllMyReviews,
);
// 리뷰수정
router.put(
  '/restaurants/:restaurantId/reviews/:reviewId',
  reviewsController.updateReviews,
);
// 리뷰삭제
router.patch(
  '/restaurants/:restaurantId/reviews/:reviewId',
  reviewsController.deleteReviews,
);
export default router;
