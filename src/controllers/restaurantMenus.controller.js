import { RestaurantMenusService } from '../services/restaurantMenus.service.js';

export class RestaurantMenusController {
  constructor() {
    this.restaurantMenusService = new RestaurantMenusService();
  }

  //메뉴 생성
  createOne = async (req, res, next) => {
    try {
    //   const { id: userId, name: userName } = res.locals.user;
      const { name, price, image, content } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: '메뉴 이름 입력이 필요합니다.',
        });
      }

      if (!price) {
        return res.status(400).json({
          success: false,
          message: '메뉴 가격 입력이 필요합니다.',
        });
      }

      if (!image) {
        return res.status(400).json({
          success: false,
          message: '메뉴 이미지 입력이 필요합니다.',
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: '설명 입력이 필요합니다.',
        });
      }

      const data = await this.restaurantMenusService.createOne({
        name,
        price,
        image,
        content,
        // userId,
        // userName,
      });

      return res.status(201).json({
        success: true,
        message: '메뉴 생성에 성공했습니다.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

//메뉴 목록조회
readMany = async (req, res, next) => {
    try {
      const { sort } = req.query;
      let upperCaseSort = sort?.toUpperCase();

      if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
        upperCaseSort = 'DESC';
      }

      const data = await this.restaurantMenusService.readMany({
        sort: upperCaseSort,
      });
      console.log('data',data)
      return res.status(200).json({
        success: true,
        message: '메뉴 조회에 성공했습니다.',
        data,
        
      });
    } catch (error) {
      next(error);
    }
  };

//메뉴 수정
  updateOne = async (req, res, next) => {
    try {
      const { menuId } = req.params;
      const { name, price, image, content } = req.body;
    //   const { id: userId, name: userName } = res.locals.user;

      // 수정 정보가 하나도 없는 경우
      if ( !name && !price && !image && !content ) {
        return res.status(400).json({
          success: false,
          message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
        });
      }

    
      const data = await this.restaurantMenusService.updateOne({
        // userId,
        // userName,
        name, price, image, content,
        id: +menuId,
 
      });

      return res.status(200).json({
        success: true,
        message: '메뉴 수정에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req, res, next) => {
    try {
      const { menuId } = req.params;
    //   const { id: userId, name: userName } = res.locals.user;

      const data = await this.restaurantMenusService.deleteOne({
        // userId,
        // userName,
        id: +menuId,
      });

      return res.status(200).json({
        success: true,
        message: '메뉴 삭제에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };


}
