import { prisma} from '../utils/prisma/index.js'

export class RestaurantRepository{
createOne = async ({ name, address, content, menu, category }) => {
    const restaurant = await prisma.restaurants.create({
        data:{
            name, address, content, menu, category
        }
    })
    return restaurant
}


updateOneById = async (id, { name, address, content, menu, category }) => {
    const restaurant = await prisma.restaurants.findUnique({ where: { id } });

 
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