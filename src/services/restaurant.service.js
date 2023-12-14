import { RestaurantRepository } from '../repositories/restaurant.repository.js'

export class RestaurantService {
    constructor() {
        this.restaurantRepository = new RestaurantRepository();
    }

    createOne = async({name, address, content, menu, category}) => {
const restaurant = await this.restaurantRepository.createOne({
    name, address, content, menu, category
})

return { ... restaurant}

    }

    updateOne = async ({ id, name, address, content, menu, category }) => {
        // 일치하는 상품이 존재하지 않는 경우
        // const menu = await this.menusRepository.readOneById(id);
    
        // // 작성자ID와 인증 정보의 사용자ID가 다른 경우
        // const isMenuBoss = menu.userId === userId;
        // if (!isMenuBoss) {
        //   throw new HttpStatus.Forbidden('상품 수정 권한이 없습니다.');
        // }
    
        const updatedRestaurant = await this.restaurantRepository.updateOneById(id, {
            name, address, content, menu, category
        });
    
        return { ...updatedRestaurant };


        
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
        
            const deletedRestaurant = await this.restaurantRepository.deleteOneById(id);
        
            return { ...deletedRestaurant };
          };
}