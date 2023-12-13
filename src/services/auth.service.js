import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

//암호화 정보
const algorithm = process.env.MAIL_VERIFY_ALGORITHM;
const key = crypto.scryptSync(
  process.env.MAIL_VERIFY_PASSWORD,
  process.env.MAIL_VERIFY_SALT,
  32,
);
const iv = crypto.randomBytes(16);

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
  sendVerifyEmail = async (email) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let token = cipher.update(email, 'utf8', 'hex');
    token += cipher.final('hex');
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

    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? console.log(error) : console.log(response);
      smtpTransport.close();
    });
  };

  //인증 메일 검증
  verifyEmailByToken = async (url) => {
    const urlParam = url.substr(20);
    const deciper = crypto.createDecipheriv(algorithm, key, iv);
    let email = deciper.update(urlParam, 'hex', 'utf8');
    email += deciper.final('utf8');
    console.log(email);
    await this.usersRepository.verifiedUser(email);
    return;
  };
}