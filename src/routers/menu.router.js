import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { MenuRepository } from '../repositories/menu.repository.js';

const router = express.Router();
const menuRepository = new MenuRepository(prisma);

router.post('/', ordersController);

export default router;
