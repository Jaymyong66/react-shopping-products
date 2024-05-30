import { http, HttpResponse } from 'msw';
import products from './products.json';

const API_URL = import.meta.env.VITE_API_URL;

export const handlers = [
  http.get(`${API_URL}/products`, () => {
    return HttpResponse.json(products);
  }),
];
