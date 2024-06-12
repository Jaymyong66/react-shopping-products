import { useQuery } from '@tanstack/react-query';
import { fetchCartItem } from '../../api';
import { QUERY_KEY } from '../../constant/queryKey';

const useCartItems = () => {
  const {
    data = [],
    isError,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY.CART_ITEMS],
    queryFn: fetchCartItem,
  });

  return {
    cartItems: data,
    cartItemsQueryError: isError,
    cartItemsQuerySuccess: isSuccess,
    cartItemsQueryFetching: isFetching,
  };
};

export default useCartItems;
