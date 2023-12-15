import { deepFreeze } from '../../utils/deepFreeze.js';

export const StatusCodes = deepFreeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
});

export const Status = deepFreeze({
  ORDERED: '주문 완료',
  DELEVERYED: '배달 완료',
});

export const ErrorMessages = deepFreeze({
  MISSING_EMAIL: '이메일을 입력해주세요.',
  MISSING_PASSWORD: '비밀번호 혹은 비밀번호 재확인을 입력해주세요.',
  MISSING_NAME: '이름을 입력해주세요.',
  MISSING_PRICE: '가격을 입력해주세요',
  MISSING_IMAGE: '이미지를 입력해주세요',
  MISSING_CONTENT: '내용을 입력해주세요',
  MISSING_ADDRESS: '주소를 입력해주세요',
  MISSING_UPDATED_INFO: '수정 정보는 최소 한 가지 이상이어야 합니다.',
  MISSING_MENU: '메뉴를 입력해주세요',
  MISSING_CATEGORY: '카테고리를 입력해주세요',
  ALREADY_REGISTERED: '이미 가입 된 이메일입니다.',
  PASSWORD_MISMATCH: '비밀번호와 비밀번호 재확인이 일치하지 않습니다.',
  SHORT_PASSWORD: '비밀번호를 6자리 이상 입력해주세요.',
  INVALID_EMAIL: '이메일 형식이 올바르지 않습니다.',
  INVALID_DATA: '데이터 형식이 올바르지 않습니다.',
  INVALID_STATUS: '상태 값이 잘못되었습니다.',
  USER_NOT_FOUND: '해당 이메일을 가진 사용자를 찾을 수 없습니다.',
  INVALID_PASSWORD: '비밀번호가 일치하지 않습니다.',
  NO_PRODUCT_ACCESS: '해당 상품에 대한 접근 권한이 없습니다.',
  PRODUCT_NOT_FOUND: '상품을 찾을 수 없습니다.',
  SERVER_ERROR: '서버 내부 오류가 발생하였습니다.',
  MISSING_TOKEN: '헤더에 유효한 토큰이 없습니다.',
  INVALID_USER: '유효한 사용자가 아닙니다.',
  TOKEN_EXPIRED: '토큰의 유효기간이 지났습니다.',
  TOKEN_VERIFICATION_FAILED: '토큰 검증에 실패하였습니다.',
  NO_SECRET_KEY: 'JWT_SECRET 키가 존재하지 않습니다.',
  EXISTING_RESTAURANT: '업장은 최대 한 개까지 생성할 수 있습니다.',
  MISSING_REVIEWID: '리뷰가 존재하지 않습니다.',
  MISSING_RESTAURANTID: '업장이 존재하지 않습니다.',
  MISSING_SCORE: '별점을 입력해주세요',
  MISSING_CONTENT: '내용을 입력해주세요',
  MISSING_REVIEWS: '리뷰가 존재하지 않습니다.',
  CART_NOT_FOUND: '장바구니를 찾을 수 없습니다.',
  CART_ITEM_NOT_FOUND: '장바구니 내 상품을 찾을 수 없습니다.',
  ORDER_NOT_FOUND: '주문을 찾을 수 없습니다.',
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다.',
  NO_RESTAURANT_ACCESS: '해당 업장에 대한 접근 권한이 없습니다.',
});

export const TokenInfo = deepFreeze({
  EXPIRATION_TIME: '12h',
});
