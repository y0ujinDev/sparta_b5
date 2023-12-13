import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  //회원 가입
  signUp = async (email, hash, nickname, isOwner) => {
    await prisma.users.create({
      data: { email, password: hash, nickname, isOwner },
    });
  };

  //이메일 인증 시 인증 회원으로 변경
  verifiedUser = async (email) => {
    await prisma.users.update({
      where: { email },
      data: {
        emailVerified: true,
      },
    });
  };

  //이메일로 회원 조회
  FindUserbyEmail = async (email) => {
    const exituser = await prisma.users.findFirst({
      where: { email },
    });
    return exituser;
  };

  //userId로 회원 조회
  FindUserbyId = async (userId) => {
    const user = await prisma.users.findFirst({
      where: { userId: +userId },
      include: { products: true },
    });
    return user;
  };
}
