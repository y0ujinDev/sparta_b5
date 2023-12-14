import { RestaurantService } from '../services/restaurant.service.js';
import {
  ErrorMessages,
  StatusCodes
} from "../utils/constants/constants.js";

export class RestaurantController {
  constructor() {
    this.restaurantService = new RestaurantService();
  }

  //업장 생성
  createOne = async (req, res, next) => {
    try {
    //   const { id: userId, name: userName } = res.locals.user;
      const { name, address, content, category } = req.body;

      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST,ErrorMessages.MISSING_NAME)
      }

      if (!address) {
        return res.status(StatusCodes.BAD_REQUEST,ErrorMessages.MISSING_ADDRESS)
      }

      if (!content) {
        return res.status(StatusCodes.BAD_REQUEST,ErrorMessages.MISSING_CONTENT)
      }

      if (!category) {
        return res.status(StatusCodes.BAD_REQUEST,ErrorMessages.MISSING_CATEGORY)          
      }

      const data = await this.restaurantService.createOne({
        name, address, content, category, ownerId:2
        // userId,
        // userName,
      });

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: '업장 생성에 성공했습니다.',
        data,
      });
    } catch (err) {
      next(err);
    }
  };

//업장 수정
updateOne = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
      const { name, address, content, menu, category } = req.body;
    //   const { id: userId, name: userName } = res.locals.user;

      // 수정 정보가 하나도 없는 경우
      if ( !name && !address && !content && !menu && !category ) {
        return res.status(StatusCodes.BAD_REQUEST,ErrorMessages.MISSING_UPDATED_INFO)
      }

    
      const data = await this.restaurantService.updateOne({
        // userId,
        // userName,
        name, address, content, menu, category,
        id: +restaurantId,
 
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: '업장 수정에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };


  deleteOne = async (req, res, next) => {
    try {
      const { restaurantId } = req.params;
    //   const { id: userId, name: userName } = res.locals.user;

      const data = await this.restaurantService.deleteOne({
        // userId,
        // userName,
        id: +restaurantId,
      });

      return res.status(StatusCodes.OK).json({
        success: true,
        message: '업장 삭제에 성공했습니다.',
        data,
      });
    } catch (error) {
      next(error);
    }
  };

}
