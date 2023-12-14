import { RestaurantReviewsService } from '../services/restaurant.reviews.service.js';
export class RestaurantReviewsController {
  restaurantReviewsService = new RestaurantReviewsService();

  // 전체 리뷰 조회
  getAllReviews = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const reviews = await this.restaurantReviewsService.findAllReviews(
        restaurantId,
      );
      console.log(reviews);
      return res.status(200).json({ data: reviews });
    } catch (err) {
      next(err);
    }
  };
}
