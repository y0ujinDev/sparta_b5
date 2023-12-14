import express from 'express';
import { UserReviewsController } from '../controllers/user.reviews.controller.js';

const router = express.Router();

const userReviewsController = new UserReviewsController();

// /orders/:orderId/reviews 공통부분
// 최신 dev시 변경할 것 restaurantI를 orderId로!
// 작동확인을 위해 orderId를 restaurantId로 변경함.

// 로그인 미들웨어추가
//리뷰생성
router.post('/:restaurantId/reviews', userReviewsController.createReview);
// 내 리뷰조회
router.get('/:restaurantId/reviews/me', userReviewsController.getAllMyReviews);
// 리뷰수정
router.put(
  '/:restaurantId/reviews/:reviewId',
  userReviewsController.updateReview,
);
// 리뷰삭제
router.patch(
  '/:restaurantId/reviews/:reviewId',
  userReviewsController.deleteReview,
);
export default router;
