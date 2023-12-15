import { RestaurantReviewsService } from '../services/restaurant.reviews.service.js';
import { ErrorMessages, StatusCodes } from '../utils/constants/constants.js';
export class RestaurantReviewsController {
  restaurantReviewsService = new RestaurantReviewsService();

  // 전체 리뷰 조회
  getAllReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const reviews = await this.restaurantReviewsService.findAllReviews(
        restaurantId,
      );
      return res.status(StatusCodes.OK).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
}
