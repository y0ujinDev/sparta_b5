export class ReviewsService {
  constructor(reviewsRepository) {
    this.reviewsRepository = reviewsRepository;
  }

  // 리뷰 생성
  createReview = async ({ userId, restaurantId, orderId, score, content }) => {
    const createdReview = await this.reviewsRepository.createReview({
      userId,
      restaurantId,
      orderId,
      score,
      content,
    });

    return {
      reviewId: createdReview.reviewId,
      score: createdReview.score,
      content: createdReview.content,
    };
  };
  // 내 전체 리뷰조회
  findAllMyReviewsByuserId = async (userId) => {
    const reviews = await this.reviewsRepository.findAllMyReviewsByuserId(
      userId,
    );
    reviews.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return reviews.map((review) => {
      return {
        reviewId: review.id,
        score: review.score,
        content: review.content,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });
  };
  // 리뷰수정
  updateReview = async (userId, reviewId, score, content) => {
    const review = await this.reviewsRepository.findByReviewId(reviewId);
    if (!review) throw new Error('리뷰가 존재하지 않습니다.');
    await this.reviewsRepository.updateReview(userId, reviewId, score, content);
    const updatedReview = await this.reviewsRepository.findByReviewId(reviewId);
    return {
      reviewId: updatedReview.id,
      score: updatedReview.score,
      content: updatedReview.content,
      createdAt: updatedReview.createdAt,
      updatedAt: updatedReview.updatedAt,
    };
  };
  // 리뷰삭제
  deleteReview = async (reviewId, userId) => {
    const review = await this.reviewsRepository.findByReviewId(reviewId);
    if (!review) throw new Error('리뷰가 존재하지 않습니다.');
    await this.reviewsRepository.deleteReview(reviewId, userId);
    return {
      reviewId: review.id,
      content: review.content,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  };
  // 전체 리뷰 조회
  findAllReviews = async (restaurantId) => {
    const reviews = await this.reviewsRepository.findAllReviews(restaurantId);
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
