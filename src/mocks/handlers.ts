import { http, HttpResponse } from 'msw';
import products from './products.json';
import cartItems from '@/mocks/cartItems.json';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';
import ENDPOINT from '../constant/endpoint';
import { CartItemType } from '../types';

let mockCartItems = cartItems.content;

interface CartItemsPostBody {
  productId: number;
  quantity: number;
}

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}${ENDPOINT.products}`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sortOptions = url.searchParams.get('sort');
    const page = Number(url.searchParams.get('page') || '0');
    const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;

    const startIndex =
      page === FIRST_FETCH_PAGE ? page : AFTER_FETCH_SIZE * (page - 5) + FIRST_FETCH_SIZE;
    const endIndex = startIndex + size;

    const filterByCategory = category
      ? products.content.filter((product) => product.category === category)
      : products.content;

    const sortCondition = sortOptions?.split(',')[1];
    const sortedProducts = filterByCategory.sort((a, b) =>
      sortCondition === 'asc' ? a.price - b.price : b.price - a.price,
    );

    const formattedProducts = sortedProducts.slice(startIndex, endIndex);
    const last = !products.content[endIndex + 1];

    return HttpResponse.json({ number: page, last, content: [...formattedProducts] });
  }),

  http.get(`${API_URL}${ENDPOINT.cartItems}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size')) ?? FIRST_FETCH_SIZE;

    const startIndex =
      page === FIRST_FETCH_PAGE ? page : AFTER_FETCH_SIZE * (page - 5) + FIRST_FETCH_SIZE;
    const endIndex = startIndex + size;

    const formattedCartItems = mockCartItems.slice(startIndex, endIndex) as CartItemType[];

    return HttpResponse.json({ content: [...formattedCartItems] });
  }),

  http.post(`${API_URL}${ENDPOINT.cartItems}`, async ({ request }) => {
    const body = (await request.json()) as CartItemsPostBody;
    const productId = Number(body.productId);
    const quantity = Number(body.quantity);

    const newCartItemId = 100;
    const product = products.content.find((product) => product.id === productId);

    if (!product) return new Response(null, { status: 404 });

    mockCartItems.push({ id: newCartItemId, quantity, product });
    return new Response(null, { status: 201 });
  }),

  http.delete(`${API_URL}${ENDPOINT.cartItems}/:cartId`, ({ params }) => {
    const { cartId } = params;

    const isExistItem = mockCartItems.find((cartItem) => cartItem.id === Number(cartId));

    if (!isExistItem) return new Response(null, { status: 404 });

    mockCartItems = cartItems.content.filter((cartItem) => cartItem.id !== Number(cartId));

    return new Response(null, { status: 201 });
  }),

  http.patch(`${API_URL}${ENDPOINT.cartItems}/:cartId`, async ({ params, request }) => {
    const { cartId } = params;
    const body = (await request.json()) as CartItemsPostBody;
    const newQuantity = Number(body.quantity);

    const isExistItem = mockCartItems.find((cartItem) => cartItem.id === Number(cartId));

    if (!isExistItem) return new Response(null, { status: 404 });

    mockCartItems = cartItems.content.map((cartItem) => {
      if (cartItem.id === Number(cartId)) return { ...cartItem, quantity: newQuantity };
      return { ...cartItem };
    });

    return new Response(null, { status: 201 });
  }),
];
