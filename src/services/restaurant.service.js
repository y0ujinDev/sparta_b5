import { RestaurantRepository } from '../repositories/restaurant.repository.js';

export class RestaurantService {
  constructor() {
    this.restaurantRepository = new RestaurantRepository();
  }

  createOne = async ({ name, address, content, category, ownerId }) => {
    const restaurant = await this.restaurantRepository.createOne({
      name,
      address,
      content,
      category,
      ownerId,
    });

    return restaurant;
  };

  findById = async (id) => {
    const restaurant = await this.restaurantRepository.findById(id);

    return restaurant;
  };

  findRestaurantByOwnerId = async ({ ownerId }) => {
    const restaurantInfo = await this.restaurantRepository.findByOwnerId({
      ownerId,
    });
    return restaurantInfo;
  };

  updateOne = async ({ id, name, address, content, category }) => {
    const updatedRestaurant = await this.restaurantRepository.updateOneById(
      id,
      {
        name,
        address,
        content,
        category,
      },
    );

    return updatedRestaurant;
  };

  deleteOne = async ({ id }) => {
    const deletedRestaurant = await this.restaurantRepository.deleteOneById(id);

    return deletedRestaurant;
  };
}
