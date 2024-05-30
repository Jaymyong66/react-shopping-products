import { useEffect } from 'react';
import { useProductFetch } from './useProductFetch';
import { useCartItems } from './useCartItems';
import { useProductSelection } from './useProductSelection';

interface Props {
  selectBarCondition: Record<string, string>;
  handleCount: (cartItemCount: number) => void;
}

export default function useProducts({ selectBarCondition, handleCount }: Props) {
  const { products, setPage, hasMore, isLoading } = useProductFetch({ selectBarCondition });
  const { cartItems, idMap, pushCartItem, popCartItem, getCartItems } = useCartItems();
  const { selectedItems, handleSelect } = useProductSelection({
    cartItems,
    idMap,
    pushCartItem,
    popCartItem,
    getCartItems,
  });

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    handleCount(cartItems.length);
  }, [cartItems]);

  return { products, setPage, hasMore, selectedItems, handleSelect, isLoading };
}
