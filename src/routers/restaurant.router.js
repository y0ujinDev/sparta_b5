import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.post('', restaurantController.createOne); //업장 생성
restaurantRouter.put('/:restaurantId', restaurantController.updateOne); //업장 수정
restaurantRouter.delete('/:restaurantId', restaurantController.deleteOne); //업장 삭제

export { restaurantRouter };
