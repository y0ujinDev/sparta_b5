import { prisma } from '../utils/prisma/index.js';
export class RestaurantReviewsRepository {
  // 전체 리뷰 조회
  findAllReviews = async (restaurantId) => {
    const foundAllReviews = await prisma.reviews.findMany({
      where: {
        restaurantId: +restaurantId,
      },
      include: {
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });
    return foundAllReviews;
  };
}
