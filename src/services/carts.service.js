import { createError } from './../utils/errorResponse.js';
import { ErrorMessages, StatusCodes } from './../utils/constants/constants.js';

export class CartsService {
  constructor(cartsRepository) {
    this.cartsRepository = cartsRepository;
  }

  createCart = async ({ userId, restaurantId }) => {
    const cart = await this.cartsRepository.createCart({
      userId,
      restaurantId,
    });

    return cart;
  };

  // 장바구니 조회
  getCart = async ({ userId, restaurantId }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });
    if (!cart) {
      cart = await this.cartsRepository.createCart({ userId, restaurantId });
    }

    return cart;
  };

  // 장바구니 메뉴 추가
  addMenu = async ({ userId, restaurantId, menuId }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    if (!cart) {
      cart = await this.cartsRepository.createCart({ userId, restaurantId });
      return cart;
    } else {
      const existingCartItem = await this.cartsRepository.findCartItem({
        cartId: cart.id,
        menuId,
      });

      if (existingCartItem) {
        await this.cartsRepository.updateQuantity({
          cartItemId: existingCartItem.id,
          quantity: existingCartItem.quantity + 1,
        });
      } else {
        await this.cartsRepository.addMenu({
          cartId: cart.id,
          menuId,
        });
      }
    }

    const updatedCart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    return updatedCart;
  };

  // 장바구니 수량 변경
  changeQuantity = async ({ userId, restaurantId, menuId, quantity }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    if (!cart) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.CART_NOT_FOUND);
    }

    const cartItem = await this.cartsRepository.findCartItem({
      cartId: cart.id,
      menuId,
    });

    if (!cartItem) {
      throw createError(
        StatusCodes.NOT_FOUND,
        ErrorMessages.CART_ITEM_NOT_FOUND,
      );
    }

    return await this.cartsRepository.updateQuantity({
      cartItemId: cartItem.id,
      quantity,
    });
  };

  // 장바구니 메뉴 삭제
  deleteMenu = async ({ userId, restaurantId, menuId }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    if (!cart) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.CART_NOT_FOUND);
    }

    const cartItem = await this.cartsRepository.findCartItem({
      cartId: cart.id,
      menuId,
    });

    if (!cartItem) {
      throw createError(
        StatusCodes.NOT_FOUND,
        ErrorMessages.CART_ITEM_NOT_FOUND,
      );
    }

    return await this.cartsRepository.deleteCartItem({
      cartItemId: cartItem.id,
    });
  };

  // 장바구니 비우기
  clearCart = async ({ userId, restaurantId }) => {
    const cart = await this.cartsRepository.getCartById({
      userId,
      restaurantId,
    });

    if (!cart) {
      throw createError(StatusCodes.NOT_FOUND, ErrorMessages.CART_NOT_FOUND);
    }

    return await this.cartsRepository.clearCart({ cartId: cart.id });
  };
}
