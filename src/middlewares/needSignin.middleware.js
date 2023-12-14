import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { StatusCodes, ErrorMessages } from '../utils/constants/constants.js';

import { prisma } from '../utils/prisma/index.js';

export default async function (req, res, next) {
  try {
    //토큰 가져오기
    console.log(req.cookies);
    const { sessionKey } = req.cookies;
    // console.log(sessionKey);
    const authorization = req.session[sessionKey];
    if (!authorization) throw new Error(ErrorMessages.MISSING_TOKEN);
    // console.log(authorization);
    //토큰 타입과 값 나누기
    const [tokenType, token] = authorization.split(' ');

    //토큰 타입이 bearer가 아닐때
    if (tokenType !== 'Bearer')
      throw new Error(ErrorMessages.TOKEN_VERIFICATION_FAILED);

    //복호화 및 검증
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const id = decodedToken.userId;

    //유저 찾기
    const user = await prisma.users.findFirst({
      where: { id: +id },
    });

    //유저 없을 경우
    if (!user) {
      res.clearCookie('sessionKey');
      throw new Error(ErrorMessages.INVALID_USER);
    }

    //req.user에 사용자 정보를 저장
    req.user = user;
    next();
  } catch (error) {
    res.clearCookie('sessionKey');
    // 토큰이 만료되었거나, 조작되었을 때, 에러 메시지를 다르게 출력
    switch (error.name) {
      case 'TokenExpiredError':
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: ErrorMessages.TOKEN_EXPIRED });
      case 'JsonWebTokenError':
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: ErrorMessages.TOKEN_VERIFICATION_FAILED });
      default:
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: error.message ?? '비정상적인 요청입니다.' });
    }
  }
}
