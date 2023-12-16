export class RestaurantRepository {
  constructor(prisma){
    this.prisma = prisma;
  }

  createOne = async ({ name, address, content, category, ownerId }) => {
    const restaurant = await this.prisma.restaurants.create({
      data: {
        name,
        address,
        content,
        category,
        ownerId,
      },
    });
    return restaurant;
  };

  findByOwnerId = async ({ ownerId }) => {
    const restaurantInfo = await this.prisma.restaurants.findFirst({
      where: {
        ownerId: ownerId,
      },
    });
    return restaurantInfo;
  };

  findById = async (id) => {
    return await this.prisma.restaurants.findUnique({
      where: { id: +id },
      select: {
        id: true,
        ownerId: true,
      },
    });
  };

  updateOneById = async (id, { name, address, content, category }) => {
    const restaurant = await this.prisma.restaurants.findUnique({ where: { id } });

    if (!restaurant) {
      throw new Error('업장 조회에 실패했습니다.');
    }

    const updatedRestaurant = await this.prisma.restaurants.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(content && { content }),
        ...(category && { category }),
      },
    });

    return updatedRestaurant;
  };

  deleteOneById = async (id) => {
    const deletedRestaurant = await this.prisma.restaurants.delete({
      where: { id },
    });

    return deletedRestaurant;
  };
}
