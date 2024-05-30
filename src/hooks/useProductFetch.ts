import { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';
import { formattedKey } from './useProducts.util';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';
import { useToast } from './useToast';
import { ERROR } from '../constant/message';

interface Props {
  selectBarCondition: Record<string, string>;
}

export function useProductFetch({ selectBarCondition }: Props) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(FIRST_FETCH_PAGE);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setProducts([]);
    setPage(FIRST_FETCH_PAGE);
    setHasMore(true);
  }, [selectBarCondition.category, selectBarCondition.sort]);

  useEffect(() => {
    const setFetchedProducts = async () => {
      try {
        setIsLoading(true);

        const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
        const queryPage =
          page === FIRST_FETCH_PAGE
            ? FIRST_FETCH_PAGE
            : FIRST_FETCH_SIZE / AFTER_FETCH_SIZE - 1 + page;
        const newProducts = await fetchProducts({
          page: queryPage,
          size,
          category: selectBarCondition.category,
          sort: formattedKey(selectBarCondition.sort),
        });
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length > 0);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          showToast(ERROR.fetchProductList);
        }
      } finally {
        setIsLoading(false);
      }
    };
    setFetchedProducts();
  }, [page, selectBarCondition.category, selectBarCondition.sort]);

  return { products, setPage, hasMore, isLoading };
}
