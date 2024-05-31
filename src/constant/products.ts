export const productCategories = {
  all: '전체',
  fashion: '패션',
  beverage: '음료',
  electronics: '전자제품',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

export const sortOptions = { priceAsc: '낮은 가격순', priceDesc: '높은 가격순' } as const;

export const FIRST_FETCH_PAGE = 0;
export const FIRST_FETCH_SIZE = 20;
export const AFTER_FETCH_SIZE = 4;
