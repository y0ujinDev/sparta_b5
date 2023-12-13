import { prisma} from '../utils/prisma/index.js'


export class RestaurantMenusRepository{
createOne = async ({  restaurantId, name, price, image, content }) => {
    const menu = await prisma.menus.create({
        data:{
          restaurantId,name, price, image, content,
        }
    })
    return menu
}


readMany = async ({ sort }) => {
    const menus = await prisma.menus.findMany({
      include: {
        restaurant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: sort.toLowerCase(),
      },
    });
    return menus
}



updateOneById = async (id, { name, price, image, content }) => {
    const menu = await prisma.menus.findUnique({ where: { id } });

    if (!menu) {
      throw new Error('메뉴 조회에 실패했습니다.');
    }

    const updatedMenu = await prisma.menus.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price && { price }),
        ...(image && { image }),
        ...(content && { content }),
      },
    });

    return updatedMenu;
  };

  deleteOneById = async (id) => {
    const menu = await prisma.menus.findUnique({ where: { id } });

    if (!menu) {
      throw new HttpStatus.NotFound('메뉴 조회에 실패했습니다.');
    }

    const deletedMenu = await prisma.menus.delete({ where: { id } });

    return deletedMenu;
  };

}