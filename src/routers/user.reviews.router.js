import express from 'express';
import { UserReviewsController } from '../controllers/user.reviews.controller.js';
import authMiddleware from '../middlewares/needSignin.middleware.js';
const router = express.Router();

const userReviewsController = new UserReviewsController();

// /orders/:orderId/reviews 공통부분

// 로그인 미들웨어추가
//리뷰생성
router.post(
  '/:orderId/reviews',
  authMiddleware,
  userReviewsController.createReview,
);
// 주문번호에 따른 내 리뷰조회
router.get(
  '/:orderId/reviews',
  authMiddleware,
  userReviewsController.getAllMyReviewsByOrderId,
);
// 내 전체 리뷰조회
router.get(
  '/orderId/reviews/me',
  authMiddleware,
  userReviewsController.getAllMyReviews,
);
// 리뷰수정
router.put(
  '/:orderId/reviews/:reviewId',
  authMiddleware,
  userReviewsController.updateReview,
);
// 리뷰삭제
router.patch(
  '/:orderId/reviews/:reviewId',
  authMiddleware,
  userReviewsController.deleteReview,
);
export default router;
