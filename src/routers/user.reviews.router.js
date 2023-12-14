import express from 'express';
import { UserReviewsController } from '../controllers/user.reviews.controller.js';

const router = express.Router();

const userReviewsController = new UserReviewsController();

// /orders/:orderId/reviews 공통부분

// 로그인 미들웨어추가
//리뷰생성
router.post('/:orderId/reviews', userReviewsController.createReview);
// 내 리뷰조회
router.get('/:orderId/reviews/me', userReviewsController.getAllMyReviews);
// 리뷰수정
router.put('/:orderId/reviews/:reviewId', userReviewsController.updateReview);
// 리뷰삭제
router.patch('/:orderId/reviews/:reviewId', userReviewsController.deleteReview);
export default router;
