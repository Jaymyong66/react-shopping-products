export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

/**
 * content : 받아온 Product 배열
 * totalPages : 현재 사이즈 기준, 전체 page 수
 * first : 현재 페이지가 첫 페이지인지
 * last : 현재 페이지가 마지막 페이지인지 (first = last 인 경우 존재)
 * size : 요청에 설정한 size
 * empty : content가 비었는지
 * number : 현재 페이지 번호
 * numberOfElements : 현재 받아온 content의 갯수
 * totalElements : 현재 category의 content 갯수, all 일때는 0
 */
export interface ProductsResponseType {
  content: ProductType[];
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  empty: boolean;
  number: number;
  numberOfElements: number;
  totalElements: number;
}

export type ProductType = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItemType = {
  id: number;
  quantity: number;
  product: ProductType;
};
