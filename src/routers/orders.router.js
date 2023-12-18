import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { OrdersController } from '../controllers/orders.controller.js';
import { OrdersService } from '../services/orders.service.js';
import { OrdersRepository } from '../repositories/orders.repository.js';
import { CartsRepository } from '../repositories/carts.repository.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { CartsService } from '../services/carts.service.js';
import { UserService } from '../services/user.service.js';
import { RestaurantService } from '../services/restaurant.service.js';
import needSignin from '../middlewares/needSignin.middleware.js';
import { restaurantOwnerCheck } from '../middlewares/restaurantOwnerCheck.middleware.js';

const router = express.Router();

const cartsService = new CartsService(new CartsRepository(prisma));
const usersService = new UserService(new UsersRepository(prisma));
const restaurantService = new RestaurantService(
  new RestaurantRepository(prisma),
);
const ordersRepository = new OrdersRepository(prisma, new CartsRepository());
const ordersService = new OrdersService(
  ordersRepository,
  cartsService,
  usersService,
  restaurantService,
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
// 유저별 주문 조회 API
router.get('/', needSignin, ordersController.handleGetOrdersByUserId);
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
