import { prisma} from '../utils/prisma/index.js'

export class RestaurantRepository{
createOne = async ({ name, address, content, menu, category, ownerId }) => {
  console.log('-----------------------------ownerId', ownerId)
    const restaurant = await prisma.restaurants.create({
        data:{
             name, address, content, menu, category, ownerId
        }
    })
    return restaurant
}


updateOneById = async (id, { name, address, content, menu, category }) => {
    const restaurant = await prisma.restaurants.findUnique({ where: { id } });

    if (!restaurant) {
      throw new Error('업장 조회에 실패했습니다.');
    }

 
    const updatedRestaurant = await prisma.restaurants.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(address && { address }),
        ...(content && { content }),
        ...(menu && { menu }),
        ...(category && { category }),
      },
    });

    return updatedRestaurant;
  };

  deleteOneById = async (id) => {
    const restaurant = await prisma.restaurants.findUnique({ where: { id } });

    
    const deletedRestaurant = await prisma.restaurants.delete({ where: { id } });

    return deletedRestaurant;
  };

}