export class MenuRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findMenuById = async (menuId) => {
    return await this.prisma.menu.findUnique({
      where: {
        id: menuId,
      },
    });
  };
}
