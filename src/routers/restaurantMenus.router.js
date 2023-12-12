import { Router } from 'express';
import { RestaurantMenusController } from '../controllers/restaurantMenus.controller.js';

const menusRouter = Router();
const restaurantMenusController = new RestaurantMenusController();

menusRouter.post('', restaurantMenusController.createOne); //메뉴 생성
menusRouter.get('', restaurantMenusController.readMany); //메뉴 조회
menusRouter.put('/:menuId', restaurantMenusController.updateOne); //메뉴 수정
menusRouter.delete('/:menuId', restaurantMenusController.deleteOne); //메뉴 삭제

export { menusRouter };
