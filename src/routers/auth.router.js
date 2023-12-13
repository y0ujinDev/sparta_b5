import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router();

const authController = new AuthController();

/** 회원가입 API **/
router.post('/signup', authController.signUp);

/** 회원가입 API **/
router.get('/verifyemail', authController.verifyEmailByToken);
export default router;
