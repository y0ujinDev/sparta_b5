import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import needSignin from '../middlewares/needSignin.middleware.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

/** 회원가입 API **/
router.post('/signup', authController.signUp);

/** 이메일 인증 링크 클릭시 API **/
router.get('/verifyemail', authController.verifyEmailByToken);

/** 로그인 API **/
router.post('/signin', authController.signIn);

/** 로그아웃 API **/
router.delete('/signout', needSignin, authController.signOut);
export default router;
