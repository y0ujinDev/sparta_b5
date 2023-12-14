import { RestaurantMenusRepository } from '../repositories/restaurantMenus.repository.js';
import { ErrorMessages, StatusCodes } from '../utils/constants/constants.js';

export class RestaurantMenusService {
  constructor() {
    this.restaurantMenusRepository = new RestaurantMenusRepository();
  }

  createOne = async ({  restaurantId, name, price, image, content }) => {
    const menu = await this.restaurantMenusRepository.createOne({
      name,
      price,
      image,
      content,
      restaurantId
    });

    return { ...menu };
  };

  readMany = async ({ sort }) => {
    const menus = await this.restaurantMenusRepository.readMany({ sort });

    return menus;
  };

  updateOne = async ({ id, name, price, image, content }) => {
    // 일치하는 상품이 존재하지 않는 경우
    // const menu = await this.menusRepository.readOneById(id);

    // // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    // const isMenuBoss = menu.userId === userId;
    // if (!isMenuBoss) {
    //   throw new HttpStatus.Forbidden('상품 수정 권한이 없습니다.');
    // }

    const updatedMenu = await this.restaurantMenusRepository.updateOneById(id, {
      name,
      price,
      image,
      content,
    });

    return { ...updatedMenu };
  };

  //({ userId, userName, id })
  deleteOne = async ({ id }) => {
    // 일치하는 상품이 존재하지 않는 경우
    // const menu = await this.menusRepository.readOneById(id);

    // // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    // const isMenuBoss = menu.userId === userId;
    // if (!isMenuBoss) {
    //   throw new HttpStatus.Forbidden('상품 삭제 권한이 없습니다.');
    // }

    const deletedMenu = await this.restaurantMenusRepository.deleteOneById(id);

    return { ...deletedMenu };
  };
}