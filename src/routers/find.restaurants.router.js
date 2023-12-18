import express from 'express';
import { prisma } from '../utils/prisma/index.js';
import { FindRestaurantsController } from '../controllers/find.restaurants.controller.js';
import { FindRestaurantsService } from '../services/find.restaurants.service.js';
import { FindRestaurantsRepository } from '../repositories/find.restaurants.repository.js';

const router = express.Router();

const findRestaurantsRepository = new FindRestaurantsRepository(prisma);
const findRestaurantsService = new FindRestaurantsService(
  findRestaurantsRepository,
);
const findRestaurantsController = new FindRestaurantsController(
  findRestaurantsService,
);

// 음식점 검색 기능
router.get('/category', findRestaurantsController.getAllRestaurants);

export default router;
