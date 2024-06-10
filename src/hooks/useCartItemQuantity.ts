import useDeleteCartItem from './useDeleteCartItem';
import usePatchCartItemQuantity from './usePatchCartItemQuantity';

const useCartItemQuantity = () => {
  const { deleteCartItem } = useDeleteCartItem();
  const { patchCartItemQuantity } = usePatchCartItemQuantity();

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
