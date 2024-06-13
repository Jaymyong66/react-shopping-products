import { useInfiniteQuery } from '@tanstack/react-query';
import { ProductType } from '@/types';
import { fetchProducts } from '@/api';
import { AFTER_FETCH_SIZE, FIRST_FETCH_SIZE, productCategories } from '@/constant/products';
import { QUERY_KEY } from '@/constant/queryKey';
import { formattedKey } from './useProducts.util';

interface Props {
  selectBarCondition: Record<string, string>;
}

const filterByValidCategory = (products: ProductType[]): ProductType[] => {
  return products.filter((product) => product.category in productCategories);
};

const useProductQuery = ({ selectBarCondition }: Props) => {
  const params = {
    category: selectBarCondition.category,
    sort: formattedKey(selectBarCondition.sort),
  };
  const { data, isError, isSuccess, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCT_ITEMS, params],
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
      return fetchProducts({ ...params, size, page: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return null;
      if (lastPage.number === 0) return 5;
      return lastPage.number + 1;
    },
    select: (data) => {
      return data.pages.map((page) => page.content).flat();
    },
  });

  return {
    products: filterByValidCategory(data ?? []),
    isProductsQueryError: isError,
    isProductsQuerySuccess: isSuccess,
    isProductsQueryFetching: isFetching,
    fetchNextPage,
  };
};

export default useProductQuery;
