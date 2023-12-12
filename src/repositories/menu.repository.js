export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuById = async (menuId) => {
    return await this.prisma.menus.findUnique({
      where: {
        id: menuId,
      },
    });
  };
}
