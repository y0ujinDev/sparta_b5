import { UserReviewsService } from '../services/user.reviews.services.js';
export class UserReviewsController {
  userReviewsService = new UserReviewsService();

  // 리뷰 생성
  createReview = async (req, res, next) => {
    try {
      const userId = req.user.id;
      // console.log('--------------req.user', req.user);
      console.log('--------------userId', userId);
      const { orderId } = req.params;
      const { restaurantId, score, content } = req.body;

      const createReviews = await this.userReviewsService.createReview({
        userId,
        restaurantId,
        orderId,
        score,
        content,
      });
      return res.status(200).send({ data: createReviews });
    } catch (err) {
      next(err);
    }
  };
  // 내 리뷰조회
  getAllMyReviews = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const reviews = await this.userReviewsService.findAllMyReviewsByuserId(
        userId,
      );
      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
  // 리뷰수정
  updateReview = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { reviewId } = req.params;
      const { score, content } = req.body;
      // console.log('---------------reviewId', reviewId);
      const updateReviews = await this.userReviewsService.updateReview(
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
      const userId = req.user.id;
      const { reviewId } = req.params;
      const deleteReviews = await this.userReviewsService.deleteReview(
        reviewId,
        userId,
      );

      return res.status(200).send({ message: '삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
