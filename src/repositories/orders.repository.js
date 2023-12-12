import { Status } from '../utils/constants/constants.js';

export class OrdersRepository {
  constructor(prisma, menuRepository) {
    this.prisma = prisma;
    this.menuRepository = menuRepository;
  }

  insertOrder = async ({ userId, menuId }) => {
    const menu = await this.menuRepository.findMenuById(menuId);

    return await this.prisma.order.create({
      data: {
        userId,
        menuId,
        name: menu.name,
      },
    });
  };

  findOrderById = async (orderId) => {
    return await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  };

  findAllOrders = async () => {
    return await this.prisma.order.findMany();
  };

  updateOrder = async (orderId, deliveryStatus) => {
    return await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        deliveryStatus,
      },
    });
  };
}
