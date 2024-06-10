import { deleteCartItem } from '@/api';
import { ERROR } from '@/constant/message';
import { MUTATION_KEY, QUERY_KEY } from '@/constant/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

const useDeleteCartItem = () => {
  const client = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: [MUTATION_KEY.DELETE_CART_ITEM],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onError: () => {
      showToast({ message: ERROR.deleteProduct, duration: 3000 });
    },
  });

  return {
    deleteCartItem: mutate,
    isDeleteCartItemError: isError,
    isDeleteCartItemSuccess: isSuccess,
  };
};

export default useDeleteCartItem;
