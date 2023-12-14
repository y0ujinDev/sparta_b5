import { StatusCodes, ErrorMessages } from '../utils/constants/constants.js';

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  //회원가입
  signUp = async (req, res, next) => {
    try {
      const { email, nickname, password, confirmPassword, isOwner } = req.body;
      if (!email) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_EMAIL,
        });
      }
      const validEmail = (email) => {
        const emailRegex =
          /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return emailRegex.test(email);
      };
      if (!validEmail(email)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.INVALID_EMAIL,
        });
      }
      if (!nickname) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_NAME,
        });
      }
      if (!password || !confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_PASSWORD,
        });
      }
      if (password.length < 6) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.SHORT_PASSWORD,
        });
      }
      if (password !== confirmPassword) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.PASSWORD_MISMATCH,
        });
      }

      //서비스 로직 실행
      const user = await this.authService.signUp(
        email,
        nickname,
        password,
        isOwner,
      );
      if (user == 'userExist') {
        return res.status(StatusCodes.CONFLICT).json({
          message: ErrorMessages.ALREADY_REGISTERED,
        });
      }
      await this.authService.sendVerifyEmail(email);
      return res.status(StatusCodes.CREATED).json({
        message:
          '인증메일이 발송되었습니다. 로그인을 위해 인증을 완료해주세요.',
      });
    } catch (err) {
      next(err);
    }
  };

  //이메일 인증
  verifyEmailByToken = async (req, res, next) => {
    try {
      const url = req.url;
      await this.authService.verifyEmailByToken(url);
      return res.status(StatusCodes.OK).json({
        message: '인증이 완료되었습니다. 로그인을 진행해주세요.',
      });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.signIn(email, password);

      //이메일 없는 경우
      if (token == 'noUser') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ErrorMessages.USER_NOT_FOUND,
        });
      }

      //비밀번호 틀린 경우
      if (token == 'failedPassword') {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.INVALID_PASSWORD,
        });
      }

      //이메일 인증하지 않은 경우
      if (token == 'noVerified') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: ErrorMessages.INVALID_USER,
        });
      }

      const uniqueInt = Date.now();
      req.session[uniqueInt] = `Bearer ${token}`;
      // console.log(req.session[uniqueInt]);
      res.cookie('sessionKey', uniqueInt);
      return res.status(StatusCodes.OK).json({ message: '로그인 성공' });
    } catch (err) {
      next(err);
    }
  };
}
