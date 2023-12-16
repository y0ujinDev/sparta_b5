import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { CartsController } from '../controllers/carts.controller.js';
import { CartsService } from '../services/carts.service.js';
import { CartsRepository } from '../repositories/carts.repository.js';
import needSignin from '../middlewares/needSignin.middleware.js';

const router = express.Router();

const cartsRepository = new CartsRepository(prisma);
const cartsService = new CartsService(cartsRepository);
const cartsController = new CartsController(cartsService);

router.get('/:restaurantId', needSignin, cartsController.handleGetCart);
router.post('/:restaurantId', needSignin, cartsController.handleAddMenu);
router.put('/:restaurantId', needSignin, cartsController.handleChangeQuantity);
router.delete('/:restaurantId', needSignin, cartsController.handleDeleteMenu);
router.delete(
  '/:restaurantId/clear',
  needSignin,
  cartsController.handleClearCart,
);

export default router;
