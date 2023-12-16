import { FindRestaurantsRepository } from '../repositories/find.restaurants.repository.js';
export class FindRestaurantsService {
  findRestaurantsRepository = new FindRestaurantsRepository();

  // 음식점 검색 기능
  findAllRestaurants = async (encodeCategory) => {
    const restaurants =
      await this.findRestaurantsRepository.findAllRestaurants(encodeCategory);

    return restaurants.map((restaurant) => {
      console.log(restaurant.menus[0].image);
      const reviewList = [];
      restaurant.reviews.map((review) => {
        reviewList.push(review.score);
      });
      return {
        name: restaurant.name,
        category: restaurant.category,
        image: restaurant.menus[0].image,
        score: reviewList,
      };
    });
  };
}
