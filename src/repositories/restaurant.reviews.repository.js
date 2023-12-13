import { prisma } from '../utils/prisma/index.js';
export class RestaurantReviewsRepository {
  // 전체 리뷰 조회
  findAllReviews = async () => {
    const reviews = await prisma.reviews.findMany({ include: { users: true } });
    return reviews;
  };
}
