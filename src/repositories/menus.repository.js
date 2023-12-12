import { prisma} from '../utils/prisma/index.js'

export class MenusRepository{
createOne = async ({ name, price, image, content }) => {
    const menu = await prisma.menu.create({
        data:{
            name, price, image, content
        }
    })
    return menu
}


readMany = async ({ sort }) => {
    const menus = await prisma.menu.findMany({
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
}



updateOneById = async (id, { name, price, image, content }) => {
    const menu = await prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new HttpStatus.NotFound('메뉴 조회에 실패했습니다.');
    }

    const updatedMenu = await prisma.menu.update({
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
    const menu = await prisma.menu.findUnique({ where: { id } });

    if (!menu) {
      throw new HttpStatus.NotFound('메뉴 조회에 실패했습니다.');
    }

    const deletedMenu = await prisma.menu.delete({ where: { id } });

    return deletedMenu;
  };

}