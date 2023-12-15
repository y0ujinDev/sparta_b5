import express from 'express';
import { FindRestaurantsController } from '../controllers/find.restaurants.controller.js';

const router = express.Router();

const findRestaurantsController = new FindRestaurantsController();

// url 수정 요망 '/restaurants/category?category="한식"'
// keyword는 쿼리?
// 음식점 검색 기능
router.get('/category', findRestaurantsController.getAllRestaurants);

export default router;
