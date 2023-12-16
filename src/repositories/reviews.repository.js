export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 리뷰 생성
  createReview = async ({ userId, restaurantId, orderId, score, content }) => {
    const createdReview = await this.prisma.reviews.create({
      data: {
        userId,
        restaurantId: +restaurantId,
        orderId: +orderId,
        score: +score,
        content,
      },
    });
    return createdReview;
  };
  // 내 전체 리뷰조회
  findAllMyReviewsByuserId = async (userId) => {
    const foundAllMyReviewsByuserId = await this.prisma.reviews.findMany({
      where: { userId },
    });
    return foundAllMyReviewsByuserId;
  };
  // ReviewId로 review 찾기
  findByReviewId = async (reviewId) => {
    const review = await this.prisma.reviews.findUnique({
      where: { id: +reviewId },
    });
    return review;
  };
  // 리뷰 수정
  updateReview = async (userId, reviewId, score, content) => {
    const updatedReview = await this.prisma.reviews.update({
      where: {
        id: +reviewId,
        userId,
      },
      data: {
        content,
        score: +score,
      },
    });
    return updatedReview;
  };
  // 리뷰 삭제
  deleteReview = async (reviewId, userId) => {
    const deletedReview = await this.prisma.reviews.delete({
      where: {
        id: +reviewId,
        userId,
      },
    });

    return deletedReview;
  };
  // 전체 리뷰 조회
  findAllReviews = async (restaurantId) => {
    const foundAllReviews = await this.prisma.reviews.findMany({
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
