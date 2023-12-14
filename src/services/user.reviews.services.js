import { UserReviewsRepository } from '../repositories/user.reviews.repository.js';
export class UserReviewsService {
  userReviewsRepository = new UserReviewsRepository();

  // 리뷰 생성
  createReview = async ({ userId, restaurantId, orderId, score, content }) => {
    const createdReview = await this.userReviewsRepository.createReview({
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
  // 내 리뷰조회
  findAllMyReviewsByuserId = async (userId) => {
    const reviews = await this.userReviewsRepository.findAllMyReviewsByuserId(
      userId,
    );
    return reviews.map((review) => {
      return {
        // userId: reviews.userId,
        score: review.score,
        content: review.content,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      };
    });
  };
  // 리뷰수정
  updateReview = async (userId, reviewId, score, content) => {
    const review = await this.userReviewsRepository.findByReviewId(reviewId);
    if (!review) throw new Error('리뷰가 존재하지 않습니다.');
    await this.userReviewsRepository.updateReview(
      userId,
      reviewId,
      score,
      content,
    );
    const updatedReview = await this.userReviewsRepository.findByReviewId(
      reviewId,
    );
    return {
      reviewId: updatedReview.reviewId,
      score: updatedReview.score,
      content: updatedReview.content,
      createdAt: updatedReview.createdAt,
      updatedAt: updatedReview.updatedAt,
    };
  };
  // 리뷰삭제
  deleteReview = async (reviewId, userId) => {
    const review = await this.userReviewsRepository.findByReviewId(reviewId);
    if (!review) throw new Error('리뷰가 존재하지 않습니다.');
    await this.userReviewsRepository.deleteReview(reviewId, userId);
    return {
      reviewId: review.reviewId,
      content: review.content,
      score: review.score,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    };
  };
}
