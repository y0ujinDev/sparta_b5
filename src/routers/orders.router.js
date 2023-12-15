import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { OrdersController } from '../controllers/orders.controller.js';
import { OrdersService } from '../services/orders.service.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { CartsRepository } from '../repositories/carts.repository.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import needSignin from '../middlewares/needSignin.middleware.js';
import { restaurantOwnerCheck } from '../middlewares/restaurantOwnerCheck.middleware.js';

const router = express.Router();

const cartsRepository = new CartsRepository(prisma);
const usersRepository = new UsersRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const ordersRepository = new OrdersRepository(prisma, cartsRepository);
const ordersService = new OrdersService(
  ordersRepository,
  cartsRepository,
  usersRepository,
  restaurantRepository,
);
const ordersController = new OrdersController(ordersService);

// 주문 생성 API
router.post('/:restaurantId', needSignin, ordersController.handleCreateOrder);
// 전체 주문 조회 API
router.get(
  '/:restaurantId',
  needSignin,
  restaurantOwnerCheck,
  ordersController.handleGetAllOrders,
);
// 주문 상세 조회 API
router.get(
  '/:restaurantId/:orderId',
  needSignin,
  restaurantOwnerCheck,
  ordersController.handleGetOrder,
);
// 주문 취소
router.delete(
  '/:restaurantId/:orderId',
  needSignin,
  restaurantOwnerCheck,
  ordersController.handleDeleteOrder,
);
// 배달 상태 수정 API
router.put(
  '/:restaurantId/:orderId',
  needSignin,
  restaurantOwnerCheck,
  ordersController.handleUpdateOrder,
);

export default router;
