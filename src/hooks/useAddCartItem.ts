import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCartItem } from '../api';
import { MUTATION_KEY, QUERY_KEY } from '../constant/queryKey';
import { useToast } from './useToast';
import { ERROR } from '@/constant/message';

const useAddCartItem = () => {
  const client = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: [MUTATION_KEY.ADD_CART_ITEM],
    mutationFn: addCartItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onError: () => {
      showToast({ message: ERROR.addProduct, duration: 3000 });
    },
  });

  return {
    addCartItem: mutate,
    isAddCartItemError: isError,
    isAddCartItemSuccess: isSuccess,
  };
};

export default useAddCartItem;
