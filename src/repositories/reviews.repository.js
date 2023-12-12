import { prisma } from '../utils/prisma/index.js';
export class ReviewsRepository {
  // 전체 리뷰 조회
  findAllReviews = async () => {
    const reviews = await prisma.reviews.findMany();
    return reviews;
  };
  // 리뷰 생성
  createReview = async (userId, score, content) => {
    const createdReview = await prisma.reviews.create({
      data: {
        userId,
        score,
        content,
      },
    });
  };
  // 내 리뷰조회
  findAllMyReviews = async (userId) => {
    const foundAllMyReviews = await prisma.reviews.findMany({
      where: { userId: +userId },
    });
    return foundAllMyReviews;
  };
  // ReviewId로 review 찾기
  findByReviewId = async (reviewId) => {
    const review = await prisma.reviews.findUnique({
      where: { reviewId: +reviewId },
    });
    return review;
  };
  // 리뷰 수정
  updateReview = async (userId, reviewId, score, content) => {
    const updatedReview = await prisma.reviews.update({
      where: {
        reviewId: +reviewId,
        userId,
      },
      data: {
        content,
        score,
      },
    });
    return updatedReview;
  };
  // 리뷰 삭제
  deleteReview = async (reviewId, userId) => {
    const deletedReview = await prisma.reviews.delete({
      where: {
        reviewId: +reviewId,
        userId,
      },
    });

    return deletedReview;
  };
}
