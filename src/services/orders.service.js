export class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  createOrder = async ({ userId, restaurantId }) => {
    const order = await this.ordersRepository.createOrder({
      userId,
      restaurantId,
    });

    return order;
  };

  getOrder = async (orderId) => {
    const order = await this.ordersRepository.findOrderById(orderId);

    return order;
  };

  getAllOrders = async () => {
    const orders = await this.ordersRepository.findAllOrders();

    return orders;
  };

  updataOrder = async (orderId, deliveryStatus) => {
    const order = await this.ordersRepository.updateOrder(
      orderId,
      deliveryStatus,
    );

    return order;
  };
}
