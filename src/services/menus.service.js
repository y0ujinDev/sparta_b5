import { MenusRepository } from '../repositories/menus.repository.js'

export class MenusService{
    constructor() {
        this.menusRepository = new MenusRepository();
    }

    createOne = async({name, price, image, content }) => {
const menu = await this.menusRepository.createOne({
    name, price, image, content
})

return { ... menu}

    }

    readMany = async ({ sort }) => {
        const menus = await this.menusRepository.readMany({ sort });
    
        return menus;
      };



      updateOne = async ({ id, name, price, image, content }) => {
        // 일치하는 상품이 존재하지 않는 경우
        // const menu = await this.menusRepository.readOneById(id);
    
        // // 작성자ID와 인증 정보의 사용자ID가 다른 경우
        // const isMenuBoss = menu.userId === userId;
        // if (!isMenuBoss) {
        //   throw new HttpStatus.Forbidden('상품 수정 권한이 없습니다.');
        // }
    
        const updatedMenu = await this.menusRepository.updateOneById(id, {
            name, price, image, content
        });
    
        return { ...updatedMenu };
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
    
        const deletedMenu = await this.menusRepository.deleteOneById(id);
    
        return { ...deletedMenu };
      };


}