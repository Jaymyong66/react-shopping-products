import { useState, useEffect } from 'react';
import { addCartItem, deleteCartItem, fetchCartItem } from '../api';
import { CartItemType } from '../types';
import { useToast } from './useToast';
import { ERROR } from '../constant/message';

export function useCartItems() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [idMap, setIdMap] = useState<Record<number, number>>({});
  const { showToast } = useToast();

  const getCartItems = async () => {
    const cartItems = await fetchCartItem();
    setCartItems(cartItems);
  };

  useEffect(() => {
    const newIdMap: Record<number, number> = {};
    cartItems.forEach((cartItem) => {
      newIdMap[cartItem.product.id] = cartItem.id;
    });
    setIdMap(newIdMap);
  }, [cartItems]);

  const pushCartItem = async (itemId: number) => {
    try {
      await addCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast(ERROR.addProduct);
      return false;
    }
  };

  const popCartItem = async (itemId: number) => {
    try {
      await deleteCartItem(itemId);
      getCartItems();
      return true;
    } catch (error) {
      showToast(ERROR.deleteProduct);
      return false;
    }
  };

  return { cartItems, idMap, pushCartItem, popCartItem, getCartItems };
}
