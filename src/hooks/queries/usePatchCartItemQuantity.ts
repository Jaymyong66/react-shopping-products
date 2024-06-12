import { patchCartItemQuantity } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@/constant/queryKey';
import { CartItemType } from '@/types';

interface Props {
  onError: () => void;
}

const usePatchCartItemQuantity = ({ onError }: Props) => {
  const client = useQueryClient();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: patchCartItemQuantity,
    onSettled: () => {
      client.invalidateQueries({
        queryKey: [QUERY_KEY.CART_ITEMS],
      });
    },
    onMutate: async ({ cartItemId, newQuantity }) => {
      await client.cancelQueries({ queryKey: [QUERY_KEY.CART_ITEMS] });

      const prevData = client.getQueryData<CartItemType[]>([QUERY_KEY.CART_ITEMS]);

      client.setQueryData([QUERY_KEY.CART_ITEMS], (oldData: CartItemType[]) => {
        const newData = oldData.map((item) =>
          item.id === cartItemId
            ? {
                ...item,
                quantity: newQuantity,
              }
            : item,
        );

        return newData;
      });

      return { prevData };
    },
    onError: (_, __, context) => {
      client.setQueryData([QUERY_KEY.CART_ITEMS], context?.prevData);
      onError();
    },
  });
  return {
    patchCartItemQuantity: mutate,
    isPatchCartItemQuantitySuccess: isSuccess,
    isPatchCartItemQuantityError: isError,
  };
};

export default usePatchCartItemQuantity;
