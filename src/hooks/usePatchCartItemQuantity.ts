import { patchCartItemQuantity } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';
import { QUERY_KEY } from '@/constant/queryKey';
import { ERROR } from '@/constant/message';

const usePatchCartItemQuantity = () => {
  const client = useQueryClient();
  const { showToast } = useToast();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: patchCartItemQuantity,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onError: () => {
      showToast({ message: ERROR.patchCartItemQuantity, duration: 3000 });
    },
  });
  return {
    patchCartItemQuantity: mutate,
    isPatchCartItemQuantitySuccess: isSuccess,
    isPatchCartItemQuantityError: isError,
  };
};

export default usePatchCartItemQuantity;
