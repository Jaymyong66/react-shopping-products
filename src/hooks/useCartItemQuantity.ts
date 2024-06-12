import { ERROR } from '@/constant/message';
import useDeleteCartItem from './queries/useDeleteCartItem';
import usePatchCartItemQuantity from './queries/usePatchCartItemQuantity';
import { useToast } from './useToast';

const useCartItemQuantity = () => {
  const { showToast } = useToast();
  const { deleteCartItem } = useDeleteCartItem({
    onError: () => {
      showToast({ message: ERROR.deleteProduct, duration: 3000 });
    },
  });
  const { patchCartItemQuantity } = usePatchCartItemQuantity({
    onError: () => {
      showToast({ message: ERROR.patchCartItemQuantity, duration: 3000 });
    },
  });

  const decreaseCartItemQuantity = (cartItemId: number, quantity: number) => {
    if (quantity === 1) {
      deleteCartItem(cartItemId);
      return;
    }
    patchCartItemQuantity({ cartItemId, newQuantity: quantity - 1 });
  };

  const increaseCartItemQuantity = (cartItemId: number, quantity: number) => {
    patchCartItemQuantity({ cartItemId, newQuantity: quantity + 1 });
  };

  return { decreaseCartItemQuantity, increaseCartItemQuantity };
};

export default useCartItemQuantity;
