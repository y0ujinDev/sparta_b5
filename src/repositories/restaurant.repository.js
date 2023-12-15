import { prisma} from '../utils/prisma/index.js'

export class RestaurantRepository{
createOne = async ({ name, address, content, category, ownerId }) => {
    const restaurant = await prisma.restaurants.create({
        data:{
             name, address, content, category, ownerId
        }
    })
    return restaurant
}

findByOwnerId= async({ ownerId })=> {
const restaurantInfo = await prisma.restaurants.findFirst({
  where:{
    ownerId: ownerId,
  }
})
return restaurantInfo
}




updateOneById = async (id, { name, address, content, category }) => {
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
        ...(category && { category }),
      },
    });

    return updatedRestaurant;
  };

  deleteOneById = async (id) => {
   
    const deletedRestaurant = await prisma.restaurants.delete({ where: { id } });

    return deletedRestaurant;
  };

}