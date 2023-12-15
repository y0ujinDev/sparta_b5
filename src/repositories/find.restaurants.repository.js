import { prisma } from '../utils/prisma/index.js';

export class FindRestaurantsRepository {
  findAllRestaurants = async (encodeCategory) => {
    const foundAllRestaurants = await prisma.restaurants.findMany({
      where: {
        category: {
          contains: decodeURI(encodeCategory),
        },
      },
    });
    return foundAllRestaurants;
  };
}
