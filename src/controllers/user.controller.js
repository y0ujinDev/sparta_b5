import { StatusCodes, ErrorMessages } from '../utils/constants/constants.js';

export class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  //내 정보 조회
  readUser = async (req, res, next) => {
    try {
      const userId = req.user.id;
      console.log(req.user);
      const user = await this.userService.readUser(userId);
      return res.status(StatusCodes.OK).json({ data: user });
    } catch (err) {
      next(err);
    }
  };

  //내 정보 수정
  updateUser = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { nickname, isOwner } = req.body;
      await this.userService.updateUser(userId, nickname, isOwner);

      //수정 성공
      return res
        .status(StatusCodes.OK)
        .json({ Message: '회원정보를 수정하였습니다.' });
    } catch (err) {
      next(err);
    }
  };
}
