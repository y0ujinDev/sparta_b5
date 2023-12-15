import { Status } from '../utils/constants/constants.js';

export class OrdersRepository {
  constructor(prisma, cartsRepository) {
    this.prisma = prisma;
    this.cartsRepository = cartsRepository;
  }

  createOrder = async ({ userId, restaurantId }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });
    const total = cart.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.menu.price,
      0,
    );

    const order = await this.prisma.orders.create({
      data: {
        userId,
        restaurantId: +restaurantId,
        total,
        deliveryStatus: Status.ORDERED,
      },
    });

    return order;
  };

  findOrderById = async (orderId) => {
    return await this.prisma.orders.findUnique({
      where: {
        id: +orderId,
      },
    });
  };

  findAllOrders = async () => {
    return await this.prisma.orders.findMany();
  };

  updateOrder = async ({ orderId, deliveryStatus }) => {
    return await this.prisma.orders.update({
      where: {
        id: +orderId,
      },
      data: {
        deliveryStatus,
      },
    });
  };

  deleteOrder = async (orderId) => {
    return await this.prisma.orders.delete({
      where: {
        id: +orderId,
      },
    });
  };
}
