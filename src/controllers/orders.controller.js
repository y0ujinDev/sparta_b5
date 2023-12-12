import { StatusCodes } from './../utils/constants/constants';

export class OrdersController {
  constructor(ordersService) {
    this.ordersService = ordersService;
  }

  handleCreateOrder = async (req, res, next) => {
    const { menuId, quantity } = req.body;
    const { userId } = req.locals.user.id;
    try {
      const order = await this.ordersService.createOrder({
        userId,
        menuId,
        quantity,
      });

      return res.status(StatusCodes.CREATED).json({
        message: '주문이 정상처리 되었습니다.',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };
}
