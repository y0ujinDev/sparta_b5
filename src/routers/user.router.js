import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/user.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import needSignin from '../middlewares/needSignin.middleware.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const userService = new UserService(usersRepository);
const userController = new UserController(userService);

/** 내 정보 조회 API **/
router.get('/', needSignin, userController.readUser);

/** 내 정보 수정 API **/
router.post('/', needSignin, userController.updateUser);

export default router;
