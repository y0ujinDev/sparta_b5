export class OrdersService {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  createOrder = async ({ userId, menuId, quantity }) => {
    const order = await this.ordersRepository.createOrder({
      userId,
      menuId,
      quantity,
    });

    return order;
  };

  getOrder = async (orderId) => {
    const order = await this.ordersRepository.findOrderById(orderId);

    return order;
  };
}
