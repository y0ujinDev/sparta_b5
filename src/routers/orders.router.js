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

// 주문 생성 API
router.post('/', ordersController.handleCreateOrder);
// 전체 주문 조회 API
router.get('/', ordersController.handleGetAllOrders);
// 주문 상세 조회 API
router.get('/:orderId', ordersController.handleGetOrder);
// 주문 수정 API
router.put('/:orderId', ordersController.handleUpdateOrder);

export default router;
