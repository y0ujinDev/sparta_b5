import { Router } from 'express';
import { menusRouter } from './menus.router.js';

const router = Router();

router.use('/restaurants/menus', menusRouter);

export default router;
