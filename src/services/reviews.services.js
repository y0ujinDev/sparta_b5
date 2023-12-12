import { ReviewsRepository } from '../repositories/reviews.repository.js';
export class ReviewsService {
  reviewsRepository = new ReviewsRepository();
}

// 전체 리뷰 조회
findAllReviews = async () => {
  const reviews = await this.reviewsRepository.findAllReviews();

  reviews.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return reviews.map((reviews) => {
    return {
      userId: reviews.userId,
      content: reviews.content,
      score: reviews.content,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
    };
  });
};
// 리뷰 생성
createReview = async (userId, score, content) => {
  const createdReview = await this.reviewsRepository.createReview(
    userId,
    score,
    content,
  );

  return { score: createdReview.score, content: createdReview.content };
};
// 내 리뷰조회
findAllMyReviews = async (userId) => {
  const reviews = await this.reviewsRepository.findAllMyReviews(userId);
  return {
    content: reviews.content,
    score: reviews.score,
    createdAt: reviews.createdAt,
    updatedAt: reviews.updatedAt,
  };
};
// 리뷰수정
updateReview = async (userId, reviewId, score, content) => {
  const review = await this.reviewsRepository.findByReviewId(reviewId);
  await this.reviewsRepository.updateReview(userId, reviewId, score, content);
  const updatedReview = await this.reviewsRepository.findByReviewId(reviewId);
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
  const review = await this.reviewsRepository.findByReviewId(reviewId);
  if (!reviewId) throw new Error('리뷰가 존재하지 않습니다.');
  await this.reviewsRepository.deleteReview(reviewId, userId);
  return {
    reviewId: review.reviewId,
    content: review.content,
    score: review.score,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  };
};
