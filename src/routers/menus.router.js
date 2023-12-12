import { Router } from 'express';
import { MenusController } from '../controllers/menus.controller.js';

const menusRouter = Router();
const menusController = new MenusController();

menusRouter.post('', menusController.createOne); //메뉴 생성
menusRouter.get('', menusController.readMany); //메뉴 조회
menusRouter.put('/:menuId', menusController.updateOne); //메뉴 수정
menusRouter.delete('/:menuId', menusController.deleteOne); //메뉴 삭제

export { menusRouter };
