import { prisma } from '../utils/prisma/index.js';
export class UserReviewsRepository {
  // 리뷰 생성
  createReview = async ({ userId, orderId, reviewId, score, content }) => {
    console.log('-------------------------------userId', userId);
    const createdReview = await prisma.reviews.create({
      data: {
        userId,
        orderId: +orderId,
        reviewId: +reviewId,
        score: +score,
        content,
      },
    });
    return createdReview;
  };
  // 내 리뷰조회
  findAllMyReviewsByuserId = async (userId) => {
    const foundAllMyReviewsByuserId = await prisma.reviews.findFirst({
      where: { userId: +userId },
    });
    return foundAllMyReviewsByuserId;
  };
  // ReviewId로 review 찾기
  findByReviewId = async (reviewId) => {
    const review = await prisma.reviews.findUnique({
      where: { id: +reviewId },
    });
    return review;
  };
  // 리뷰 수정
  updateReview = async (userId, reviewId, score, content) => {
    const updatedReview = await prisma.reviews.update({
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
    const deletedReview = await prisma.reviews.delete({
      where: {
        id: +reviewId,
        userId,
      },
    });

    return deletedReview;
  };
}
