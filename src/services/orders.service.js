import { createError } from './../utils/errorResponse.js';
import {
  StatusCodes,
  ErrorMessages,
  Status,
} from './../utils/constants/constants.js';

export class OrdersService {
  constructor(
    ordersRepository,
    cartsRepository,
    usersRepository,
    restaurantRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.cartsRepository = cartsRepository;
    this.usersRepository = usersRepository;
    this.restaurantRepository = restaurantRepository;
  }

  createOrder = async ({ userId, restaurantId }) => {
    const order = await this.ordersRepository.createOrder({
      userId,
      restaurantId,
    });

    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    if (!cart || !cart.cartItems.length) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.CART_NOT_FOUND);
    }

    // 주문 생성 시 장바구니 초기화
    await this.cartsRepository.clearCart({ userId, restaurantId });

    // 포인트 관련 로직
    const restaurant = await this.restaurantRepository.findById(restaurantId);

    if (!restaurant) {
      throw createError(
        StatusCodes.NOT_FOUND,
        ErrorMessages.RESTAURANT_NOT_FOUND,
      );
    }

    const totalPoints = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.menu.price,
      0,
    );

    await this.usersRepository.deductPoints(userId, totalPoints);
    await this.usersRepository.addPoints(restaurant.ownerId, totalPoints);

    return order || [];
  };

  getOrder = async (orderId) => {
    const order = await this.ordersRepository.findOrderById(orderId);

    if (!order) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.ORDER_NOT_FOUND);
    }

    return order;
  };

  getAllOrders = async () => {
    const orders = await this.ordersRepository.findAllOrders();

    return orders;
  };

  updateOrder = async ({ orderId, deliveryStatus }) => {
    const order = await this.ordersRepository.findOrderById(orderId);

    if (!order) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.ORDER_NOT_FOUND);
    }

    if (
      deliveryStatus === Status.ORDERED ||
      deliveryStatus === Status.DELIVERYED
    ) {
      throw createError(StatusCodes.BAD_REQUEST, ErrorMessages.INVALID_STATUS);
    }

    await this.ordersRepository.updateOrder({ orderId, deliveryStatus });

    return order;
  };

  deleteOrder = async (orderId) => {
    const order = await this.ordersRepository.findOrderById(orderId);

    if (!order) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.ORDER_NOT_FOUND);
    }

    await this.ordersRepository.deleteOrder(orderId);

    return order;
  };
}
