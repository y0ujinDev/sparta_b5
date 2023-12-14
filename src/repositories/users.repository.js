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
}
