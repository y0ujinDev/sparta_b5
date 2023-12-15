import { StatusCodes, ErrorMessages } from '../utils/constants/constants.js';
import { prisma } from '../utils/prisma/index.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';

export const restaurantOwnerCheck = async (req, res, next) => {
  const restaurantRepository = new RestaurantRepository(prisma);
  const { restaurantId } = req.params;
  const restaurant = await restaurantRepository.findById(restaurantId);

  if (!restaurant) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: ErrorMessages.MISSING_RESTAURANTID,
    });
  }

  if (req.user.id !== restaurant.ownerId) {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: ErrorMessages.NO_RESTAURANT_ACCESS,
    });
  }

  next();
};
