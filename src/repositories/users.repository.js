// import { pick } from 'lodash';

export class UsersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  //회원 가입
  signUp = async (email, hash, nickname, isOwner) => {
    await this.prisma.users.create({
      data: { email, password: hash, nickname, isOwner },
    });
  };

  //이메일 인증 시 인증 회원으로 변경
  verifiedUser = async (email) => {
    await this.prisma.users.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
  };

  //이메일로 회원 조회
  FindUserbyEmail = async (email) => {
    const exituser = await this.prisma.users.findFirst({
      where: { email },
    });
    return exituser;
  };

  //user Id로 회원조회
  FindUserbyId = async (userId) => {
    const user = await this.prisma.users.findFirst({
      where: { id: userId },
      include: { reviews: true, orders: true },
    });
    return user;
  };

  //회원 정보 수정
  updateUser = async (userId, nickname, isOwner) => {
    const updateduser = await this.prisma.users.update({
      where: {
        id: +userId,
      },
      data: {
        nickname,
        isOwner,
      },
    });
    return updateduser;
  };

  // 포인트 관련 로직
  deductPoints = async (userId, points) => {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });

    const updatedPoint = user.point - points;

    return this.prisma.users.update({
      where: { id: userId },
      data: { point: updatedPoint },
    });
  };

  addPoints = async (userId, points) => {
    const user = await this.prisma.users.findUnique({ where: { id: userId } });

    const updatedPoint = user.point + points;

    return this.prisma.users.update({
      where: { id: userId },
      data: { point: updatedPoint },
    });
  };
}
