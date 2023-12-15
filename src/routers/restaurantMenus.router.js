import { Router } from 'express';
import { RestaurantMenusController } from '../controllers/restaurantMenus.controller.js';
import imageUpload from '../middlewares/imageuploader.js'
import needSignin from '../middlewares/needSignin.middleware.js';

const restaurantMenusRouter = Router();
const restaurantMenusController = new RestaurantMenusController();

restaurantMenusRouter.post('',  (req,res,next) =>{console.log(req.params);next()}, needSignin, imageUpload.single('image'), restaurantMenusController.createOne); //메뉴 생성
restaurantMenusRouter.get('', restaurantMenusController.readMany); //메뉴 조회
restaurantMenusRouter.put('/:menuId', needSignin, imageUpload.single('image'), restaurantMenusController.updateOne); //메뉴 수정
restaurantMenusRouter.delete('/:menuId', needSignin, restaurantMenusController.deleteOne); //메뉴 삭제

export { restaurantMenusRouter };

