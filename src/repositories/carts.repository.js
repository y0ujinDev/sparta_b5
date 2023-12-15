export class CartsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  createCart = async ({ userId, restaurantId }) => {
    const cart = await this.prisma.carts.createCart({
      userId,
      restaurantId: +restaurantId,
    });

    return cart;
  };

  // 장바구니 조회
  getCartById = async ({ userId, restaurantId }) => {
    const cart = await this.prisma.carts.findFirst({
      where: {
        userId,
        restaurantId: +restaurantId,
      },
      include: {
        cartItems: {
          include: {
            menu: true,
          },
        },
      },
    });
    return cart;
  };

  // 장바구니 메뉴 추가
  addMenu = async ({ cartId, menuId }) => {
    return await this.prisma.cartItems.create({
      data: {
        cartId,
        menuId,
        quantity: 1,
      },
    });
  };

  // 장바구니 아이템 조회
  findCartItem = async ({ cartId, menuId }) => {
    return await this.prisma.cartItems.findFirst({
      where: {
        cartId,
        menuId,
      },
    });
  };

  // 장바구니 아이템 수량 변경
  updateQuantity = async ({ cartItemId, quantity }) => {
    return await this.prisma.cartItems.update({
      where: {
        id: cartItemId,
      },
      data: {
        quantity,
      },
    });
  };

  // 장바구니 아이템 삭제
  deleteCartItem = async ({ cartItemId }) => {
    return await this.prisma.cartItems.delete({
      where: {
        id: cartItemId,
      },
    });
  };

  // 장바구니 비우기
  clearCart = async ({ userId, restaurantId }) => {
    return await this.prisma.cartItems.deleteMany({
      where: {
        cart: {
          userId,
          restaurantId: +restaurantId,
        },
      },
    });
  };
}
