import { useState, useEffect } from 'react';
import { CartItemType } from '../types';

interface Props {
  cartItems: CartItemType[];
  idMap: Record<number, number>;
  pushCartItem: (itemId: number) => Promise<boolean>;
  popCartItem: (itemId: number) => Promise<boolean>;
  getCartItems: () => Promise<void>;
}

export function useProductSelection({
  cartItems,
  idMap,
  pushCartItem,
  popCartItem,
  getCartItems,
}: Props) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const newSelectedItems: number[] = [];
    const cartItemIds = cartItems.map((cartItem) => cartItem.product.id);

    cartItems.forEach((product) => {
      if (cartItemIds.includes(product.product.id)) {
        newSelectedItems.push(product.product.id);
      }
    });
    setSelectedItems(new Set(newSelectedItems));
  }, [cartItems]);

  const handleSelect = async (itemId: number) => {
    const newSelectedItems = new Set(selectedItems);
    if (selectedItems.has(itemId)) {
      const result = await popCartItem(idMap[itemId]);
      if (result) newSelectedItems.delete(itemId);
    } else {
      const result = await pushCartItem(itemId);
      if (result) newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
    getCartItems();
  };

  return { selectedItems, handleSelect };
}
