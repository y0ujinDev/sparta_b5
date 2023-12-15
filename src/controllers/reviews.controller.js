import { ErrorMessages, StatusCodes } from '../utils/constants/constants.js';

export class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }

  // 리뷰 생성
  createReview = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
      const { restaurantId, score, content } = req.body;
      if (!restaurantId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: ErrorMessages.MISSING_RESTAURANTID });
      }
      if (!score) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: ErrorMessages.MISSING_SCORE });
      }

      if (!content) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: ErrorMessages.MISSING_CONTENT });
      }

      const createReviews = await this.reviewsService.createReview({
        userId,
        restaurantId,
        orderId,
        score,
        content,
      });
      return res.status(StatusCodes.CREATED).json({ data: createReviews });
    } catch (err) {
      next(err);
    }
  };
  // 주문번호에 따른 내 리뷰조회
  getAllMyReviewsByOrderId = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;
      console.log('----------orderId', orderId);
      const reviews =
        await this.reviewsService.findAllMyReviewsByuserIdAndOrderId(
          userId,
          orderId,
        );

      return res.status(StatusCodes.OK).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
  // 내 전체 리뷰조회
  getAllMyReviews = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const reviews = await this.reviewsService.findAllMyReviewsByuserId(
        userId,
      );

      return res.status(StatusCodes.OK).json({ data: reviews });
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

      const updateReviews = await this.reviewsService.updateReview(
        userId,
        reviewId,
        score,
        content,
      );

      return res.status(StatusCodes.OK).json({ data: updateReviews });
    } catch (err) {
      next(err);
    }
  };
  // 리뷰삭제
  deleteReview = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { reviewId } = req.params;

      const deleteReviews = await this.reviewsService.deleteReview(
        reviewId,
        userId,
      );

      return res.status(StatusCodes.OK).json({ message: '삭제되었습니다.' });
    } catch (err) {
      next(err);
    }
  };
  // 전체 리뷰 조회
  getAllReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const reviews = await this.reviewsService.findAllReviews(restaurantId);
      return res.status(StatusCodes.OK).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
}
