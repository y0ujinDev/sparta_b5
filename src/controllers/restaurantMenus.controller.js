import { RestaurantMenusService } from '../services/restaurantMenus.service.js';
import { ErrorMessages, StatusCodes } from '../utils/constants/constants.js';

export class RestaurantMenusController {
  constructor() {
    this.restaurantMenusService = new RestaurantMenusService();
  }

  //메뉴 생성
  createOne = async (req, res, next) => {
    try {
      const { id: userId, name: userName } = req.user.id;
      const { name, price, content } = req.body;
      const { key: image } = req.file;
      const { restaurantId } = req.params;
      console.log({ params: req.params });
      console.log( { restaurantId })

      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_NAME,
        });
      }

      if (!price) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_PRICE,
        });
      }

      if (!image) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_IMAGE,
        });
      }

      if (!content) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_CONTENT,
        });
      }

      const data = await this.restaurantMenusService.createOne({
        name,
        price: +price,
        content,
        restaurantId: +restaurantId,
        image,
        userId,
        userName,
      });

      return res.status(StatusCodes.CREATED).json({
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
      console.log('data', data);
      return res.status(StatusCodes.OK).json({
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
      const { key: image } = req.file;
      const { name, price, content } = req.body;

      // 수정 정보가 하나도 없는 경우
      if (!name && !price && !image && !content) {
        return res.status(
          StatusCodes.BAD_REQUEST,
          ErrorMessages.MISSING_UPDATED_INFO,
        );
      }

      const data = await this.restaurantMenusService.updateOne({
        name,
        price: +price,
        image,
        content,
        id: +menuId,
      });

      return res.status(StatusCodes.OK).json({
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

      const data = await this.restaurantMenusService.deleteOne({
        // userId,
        // userName,
        id: +menuId,
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: '메뉴 삭제에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
