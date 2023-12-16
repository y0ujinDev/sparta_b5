import { ErrorMessages, StatusCodes } from '../utils/constants/constants.js';

export class RestaurantController {
  constructor(restaurantService) {
    this.restaurantService = restaurantService;
  }

  //업장 생성
  createOne = async (req, res, next) => {
    try {
      //   const { id: userId, name: userName } = res.locals.user;
      const { name, address, content, category } = req.body;
      const ownerId = req.user.id;
      if (!name) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.MISSING_NAME,
        });
      }

      if (!address) {
        return res.status(
          StatusCodes.BAD_REQUEST).json({
            message: ErrorMessages.MISSING_ADDRESS,
          });
      }

      if (!content) {
        return res.status(
          StatusCodes.BAD_REQUEST).json({
            message: ErrorMessages.MISSING_CONTENT,
          });
      }

      if (!category) {
        return res.status(
          StatusCodes.BAD_REQUEST).json({
            message: ErrorMessages.MISSING_CATEGORY,
          });
      }
      
      const isOwner = req.user?.isOwner;
      // 사장님 아닌 사용자가 업장 생성시
      if (isOwner === false ) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Owner 가 아닌 사용자는 업장을 생성할 수 없습니다.',
        });
      }

      // ownerId로 이미 존재하는 레스토랑이 있는지 확인
      const existingRestaurant = await this.restaurantService.findRestaurantByOwnerId({ownerId});
      console.log({existingRestaurant})
      if (existingRestaurant) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessages.EXISTING_RESTAURANT,
        });
      }


      const data = await this.restaurantService.createOne({
        name,
        address,
        content,
        category,
        ownerId,
      });
      console.log({data})
      

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

      // 수정 정보가 하나도 없는 경우
      if (!name && !address && !content && !menu && !category) {
        return res.status(
          StatusCodes.BAD_REQUEST,
          ErrorMessages.MISSING_UPDATED_INFO,
        );
      }

      const data = await this.restaurantService.updateOne({
        name,
        address,
        content,
        category,
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

      const data = await this.restaurantService.deleteOne({
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
