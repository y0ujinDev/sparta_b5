import { prisma} from '../utils/prisma/index.js'
import 'dotenv/config';
const {S3_BASE_URL} = process.env

export class RestaurantMenusRepository{

  
createOne = async ({  restaurantId, name, price, image, content }) => {
    const menu = await prisma.menus.create({
        data:{
          restaurantId,name, price, image, content,
        }
      
    })
    return {...menu,image:S3_BASE_URL+'/'+menu.image}

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

    const menusWithImages = menus.map(menu => ({
      ...menu,
      image: `${S3_BASE_URL}/${menu.image}`, // 이미지 URL 조합
  }));

  return menusWithImages;
   
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

    return { ...updatedMenu,image:S3_BASE_URL+'/'+updatedMenu.image };
    // return {...menu,image:S3_BASE_URL+'/'+menu.image}

  };

  deleteOneById = async (id) => {
    const menu = await prisma.menus.findUnique({ where: { id } });

    if (!menu) {
      throw new new Error('메뉴 조회에 실패했습니다.');
    }

    const deletedMenu = await prisma.menus.delete({ where: { id } });

    return deletedMenu;
  };

}