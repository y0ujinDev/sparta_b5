import { ReviewsService } from '../services/reviews.services.js';
export class ReviewsController {
  reviewsService = ReviewsService();

  // 전체 리뷰 조회
  getAllReviews = async (req, res, next) => {
    try {
      const reviews = await this.reviewsService.findAllReviews();

      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };

  // 리뷰 생성
  createReview = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { score, content } = req.body;

      const createReviews = await this.reviewsService.createReview(
        userId,
        score,
        content,
      );
      return res.status(200).send({ data: createReviews });
    } catch (err) {
      next(err);
    }
  };
  // 내 리뷰조회
  getAllMyReviews = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const reviews = await this.reviewsService.findAllMyReviews(userId);

      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
  // 리뷰수정
  updateReview = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { reviewId } = req.params;
      const { score, content } = req.body;

      const updateReviews = await this.reviewsService.updateReview(
        userId,
        reviewId,
        score,
        content,
      );

      return res.status(200).send({ data: updateReviews });
    } catch (err) {
      next(err);
    }
  };
  // 리뷰삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { userId } = res.locals.user;
      const deleteReviews = await this.reviewsService.deleteReview(
        reviewId,
        userId,
      );

      return res.status(200).send({ message: '삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
