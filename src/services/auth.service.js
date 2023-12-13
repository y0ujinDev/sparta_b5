import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
// import { smtpTransport } from '../utils/config/verifyEmail.js';

export class AuthService {
  usersRepository = new UsersRepository();

  //회원가입
  signUp = async (email, nickname, password, isOwner) => {
    const existuser = await this.usersRepository.FindUserbyEmail(email);
    if (existuser) {
      return 'userExist';
    }
    const hash = await bcrypt.hash(password, 10);
    return await this.usersRepository.signUp(email, hash, nickname, isOwner);
  };

  //인증 메일 보내기
  verifyEmail = async (email) => {
    //토큰 발급 코드
    const token = crypto.randomBytes(20).toString('hex');
    console.log(token);

    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      process.env.GMAIL_OAUTH_CLIENT_ID,
      process.env.GAMAIL_OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground',
    );
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_OAUTH_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GAMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_OAUTH_USER,
      to: email,
      subject: '[CODEEATS] 회원가입 인증 메일입니다',
      generateTextFromHTML: true,
      html: `인증링크 : <a href="http://localhost:3000/api/verifyemail/?token=${token}">여기를 눌러주세요</a>`,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        smtpTransport.close();
        return 'fail';
      } else {
        console.log('Email sent: ' + info.response);
        smtpTransport.close();
        return 'success';
      }
    });
  };
}
