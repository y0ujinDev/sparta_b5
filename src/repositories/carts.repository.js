export class CartsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 장바구니에 메뉴 추가
  addMenuItemToCart = async ({ userId, restaurantId, menuId, quantity }) => {
    return await this.prisma.cartItems.create({
      data: {
        cart: {
          connectOrCreate: {
            where: { userId_restaurantId: { userId, restaurantId } },
            create: { userId, restaurantId },
          },
        },
        menuId,
        quantity,
      },
    });
  };

  // 사용자의 장바구니 조회
  findCartByUserAndRestaurant = async (userId, restaurantId) => {
    return await this.prisma.carts.findUnique({
      where: { userId_restaurantId: { userId, restaurantId } },
      include: { cartItems: { include: { menu: true } } },
    });
  };

  // 장바구니 비우기
  clearCart = async (userId, restaurantId) => {
    return await this.prisma.cartItems.deleteMany({
      where: { cart: { userId, restaurantId } },
    });
  };
}
