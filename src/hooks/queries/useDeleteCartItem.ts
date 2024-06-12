import { deleteCartItem } from '@/api';
import { MUTATION_KEY, QUERY_KEY } from '@/constant/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  onError: () => void;
}

const useDeleteCartItem = ({ onError }: Props) => {
  const client = useQueryClient();

  const { mutate, isError, isSuccess } = useMutation({
    mutationKey: [MUTATION_KEY.DELETE_CART_ITEM],
    mutationFn: deleteCartItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onError,
  });

  return {
    deleteCartItem: mutate,
    isDeleteCartItemError: isError,
    isDeleteCartItemSuccess: isSuccess,
  };
};

export default useDeleteCartItem;
