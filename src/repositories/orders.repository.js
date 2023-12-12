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
}
