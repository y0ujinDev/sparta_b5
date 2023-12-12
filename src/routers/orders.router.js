import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { OrdersController } from '../controllers/orders.controller.js';
import { OrdersService } from '../services/orders.service.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { MenuRepository } from '../repositories/menu.repository.js';

const router = express.Router();

const menuRepository = new MenuRepository(prisma);
const ordersRepository = new OrdersRepository(prisma, menuRepository);
const ordersService = new OrdersService(ordersRepository);
const ordersController = new OrdersController(ordersService);

router.post('/', ordersController.handleCreateOrder);

export default router;
