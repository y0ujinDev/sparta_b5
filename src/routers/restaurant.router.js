import { Router } from 'express';
import needSignin from '../middlewares/needSignin.middleware.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { prisma } from '../utils/prisma/index.js';


const restaurantRouter = Router();

const restaurantRepository = new RestaurantRepository(prisma) 
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);



restaurantRouter.post('', needSignin, restaurantController.createOne); //업장 생성
restaurantRouter.put('/:restaurantId', needSignin, restaurantController.updateOne); //업장 수정
restaurantRouter.delete('/:restaurantId', needSignin, restaurantController.deleteOne); //업장 삭제

export { restaurantRouter };
