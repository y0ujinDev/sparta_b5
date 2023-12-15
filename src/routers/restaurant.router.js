import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import needSignin from '../middlewares/needSignin.middleware.js';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

restaurantRouter.post('', needSignin, restaurantController.createOne); //업장 생성
restaurantRouter.put('/:restaurantId', needSignin, restaurantController.updateOne); //업장 수정
restaurantRouter.delete('/:restaurantId', needSignin, restaurantController.deleteOne); //업장 삭제

export { restaurantRouter };
