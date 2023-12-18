export class FindRestaurantsService {
  constructor(findRestaurantsRepository) {
    this.findRestaurantsRepository = findRestaurantsRepository;
  }
  // 음식점 검색 기능
  findAllRestaurants = async (encodeCategory) => {
    const restaurants =
      await this.findRestaurantsRepository.findAllRestaurants(encodeCategory);

    return restaurants.map((restaurant) => {
      const reviewList = [];
      restaurant.reviews.map((review) => {
        reviewList.push(review.score);
      });
      return {
        name: restaurant.name,
        category: restaurant.category,
        score: reviewList,
      };
    });
  };
}
