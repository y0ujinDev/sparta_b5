import { RestaurantReviewsRepository } from '../repositories/restaurant.reviews.repository.js';
export class RestaurantRevieService {
  restaurantReviewsRepository = new RestaurantReviewsRepository();
  // 전체 리뷰 조회
  findAllReviews = async () => {
    const reviews = await this.restaurantReviewsRepository.findAllReviews();

    reviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return reviews.map((reviews) => {
      return {
        nickname: reviews.nickname,
        content: reviews.content,
        score: reviews.content,
        createdAt: reviews.createdAt,
        updatedAt: reviews.updatedAt,
      };
    });
  };
}
