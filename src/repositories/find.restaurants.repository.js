export class FindRestaurantsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllRestaurants = async (encodeCategory) => {
    const foundAllRestaurants = await this.prisma.restaurants.findMany({
      where: {
        category: {
          contains: decodeURI(encodeCategory),
        },
      },
    });
    return foundAllRestaurants;
  };
}
