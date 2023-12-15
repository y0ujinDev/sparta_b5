import 'dotenv/config';
const { S3_BASE_URL } = process.env;

export class RestaurantMenusRepository {
constructor(prisma){
  this.prisma = prisma;
}


  createOne = async ({ restaurantId, name, price, image, content }) => {
    const menu = await this.prisma.menus.create({
      data: {
        restaurantId,
        name,
        price,
        image,
        content,
      },
    });
    return { ...menu, image: `${S3_BASE_URL}/${menu.image}` };
  };

  readMany = async ({ sort }) => {
    const menus = await this.prisma.menus.findMany({
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

    const menusWithImages = menus.map((menu) => ({
      ...menu,
      image: `${S3_BASE_URL}/${menu.image}`, // 이미지 URL 조합
    }));

    return menusWithImages;
  };

  updateOneById = async (id, { name, price, image, content }) => {
    const menu = await this.prisma.menus.findUnique({ where: { id } });

    if (!menu) {
      throw new Error('메뉴 조회에 실패했습니다.');
    }

    const updatedMenu = await this.prisma.menus.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(price && { price }),
        ...(image && { image }),
        ...(content && { content }),
      },
    });

    return { ...updatedMenu, image: `${S3_BASE_URL}/${updatedMenu.image}` };
  };

  deleteOneById = async (id) => {
    const menu = await this.prisma.menus.findUnique({ where: { id } });

    if (!menu) {
      throw new new Error('메뉴 조회에 실패했습니다.')();
    }

    const deletedMenu = await this.prisma.menus.delete({ where: { id } });

    return deletedMenu;
  };
}
