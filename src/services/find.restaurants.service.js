export class FindRestaurantsService {
  constructor(findRestaurantsRepository) {
    this.findRestaurantsRepository = findRestaurantsRepository;
  }
  // 음식점 검색 기능
  findAllRestaurants = async (encodeCategory) => {
    const restaurants = await this.findRestaurantsRepository.findAllRestaurants(
      encodeCategory,
    );

    return restaurants.map((restaurant) => {
      return {
        name: restaurant.name,
        address: restaurant.address,
        content: restaurant.content,
        category: restaurant.category,
      };
    });
  };
}
