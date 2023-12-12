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

  handleGetOrder = async (req, res, next) => {
    const { orderId } = req.params;
    try {
      const order = await this.ordersService.getOrder(orderId);

      return res.status(StatusCodes.OK).json({
        message: '상세 주문 내역을 확인하였습니다.',
        data: order,
      });
    } catch (err) {
      next(err);
    }
  };

  handleGetAllOrders = async (req, res, next) => {
    try {
      const orders = await this.ordersService.getAllOrders();

      return res.status(StatusCodes.OK).json({
        message: '전체 주문 내역을 확인하였습니다.',
        data: orders,
      });
    } catch (err) {
      next(err);
    }
  };
}
