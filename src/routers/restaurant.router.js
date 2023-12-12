import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurant.controller.js';

const menusRouter = Router();
const restaurantController = new RestaurantController();

menusRouter.post('', restaurantController.createOne); //업장 생성
menusRouter.put('/:menuId', restaurantController.updateOne); //업장 수정
menusRouter.delete('/:menuId', restaurantController.deleteOne); //업장 삭제

export { restaurantRouter };
