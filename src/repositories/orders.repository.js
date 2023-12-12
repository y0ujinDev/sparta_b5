export class OrdersRepository {
  constructor(prisma, menuRepository) {
    this.prisma = prisma;
    this.menuRepository = menuRepository;
  }

  insertOrder = async ({ userId, menuId, quantity }) => {
    const menu = await this.menuRepository.findMenuById(menuId);

    return await this.prisma.orderMenu.create({
      data: {
        userId,
        menuId,
        quantity,
        name: menu.name,
      },
    });
  };

  findOrderById = async (orderId) => {
    return await this.prisma.orderMenu.findUnique({
      where: {
        id: orderId,
      },
    });
  };

  findAllOrders = async () => {
    return await this.prisma.orderMenu.findMany();
  };
}
