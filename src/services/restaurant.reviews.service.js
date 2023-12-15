import { RestaurantReviewsRepository } from '../repositories/restaurant.reviews.repository.js';
export class RestaurantReviewsService {
  restaurantReviewsRepository = new RestaurantReviewsRepository();
  // 전체 리뷰 조회

  findAllReviews = async (restaurantId) => {
    const reviews = await this.restaurantReviewsRepository.findAllReviews(
      restaurantId,
    );
    return reviews.map((reviews) => {
      return {
        nickname: reviews.user.nickname,
        score: reviews.score,
        content: reviews.content,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
      };
    });
  };
}
