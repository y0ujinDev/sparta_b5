import { StatusCodes } from '../utils/constants/constants.js';

export class CartsController {
  constructor(cartsService) {
    this.cartsService = cartsService;
  }

  // 장바구니 조회
  handleGetCart = async (req, res, next) => {
    const { id: userId } = req.user;
    const { restaurantId } = req.params;
    try {
      const cart = await this.cartsService.getCart({ userId, restaurantId });

      return res.status(StatusCodes.OK).json({
        message: '장바구니를 확인하였습니다.',
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 메뉴 추가
  handleAddMenu = async (req, res, next) => {
    const { id: userId } = req.user;
    const { menuId } = req.body;
    const { restaurantId } = req.params;

    try {
      const cart = await this.cartsService.addMenu({
        userId,
        menuId,
        restaurantId,
      });

      return res.status(StatusCodes.CREATED).json({
        message: '장바구니에 메뉴를 추가하였습니다.',
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 수량 변경
  handleChangeQuantity = async (req, res, next) => {
    const { id: userId } = req.user;
    const { restaurantId } = req.params;
    const { menuId } = req.body;
    const { quantity } = req.body;
    try {
      const cart = await this.cartsService.changeQuantity({
        userId,
        restaurantId,
        menuId,
        quantity,
      });

      return res.status(StatusCodes.OK).json({
        message: '수량을 변경하였습니다.',
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 메뉴 삭제
  handleDeleteMenu = async (req, res, next) => {
    const { id: userId } = req.user;
    const { restaurantId } = req.params;
    const { menuId } = req.body;
    try {
      const cart = await this.cartsService.deleteMenu({
        userId,
        restaurantId,
        menuId,
      });

      return res.status(StatusCodes.OK).json({
        message: '장바구니에서 메뉴를 삭제하였습니다.',
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };

  // 장바구니 비우기
  handleClearCart = async (req, res, next) => {
    const { id: userId } = req.user;
    const { restaurantId } = req.params;
    try {
      const cart = await this.cartsService.clearCart({ userId, restaurantId });

      return res.status(StatusCodes.OK).json({
        message: '장바구니를 비웠습니다.',
        data: cart,
      });
    } catch (err) {
      next(err);
    }
  };
}
