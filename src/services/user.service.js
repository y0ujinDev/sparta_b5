export class UserService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  //내정보 조회
  readUser = async (userId) => {
    const user = await this.usersRepository.FindUserbyId(userId);
    return {
      userId: user.id,
      email: user.email,
      name: user.nickname,
      point: user.point,
      reviews: user.reviews.length,
      orders: user.orders.length,
    };
  };

  //내 정보 수정
  updateUser = async (userId, nickname, isOwner) => {
    //수정하기
    const updatedUser = await this.usersRepository.updateUser(
      userId,
      nickname,
      isOwner,
    );
    return updatedUser;
  };
}
