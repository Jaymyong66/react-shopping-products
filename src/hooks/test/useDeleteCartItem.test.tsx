import { act, renderHook, waitFor } from '@testing-library/react';
import useCartItems from '../useCartItems';
import { queryWrapper } from './wrapper.util';
import useDeleteCartItem from '../useDeleteCartItem';
import cartItems from '@/mocks/cartItems.json';

describe('useDeleteCartItem 훅 테스트', () => {
  it('장바구니에서 상품을 상품 ID로 제거한다.', async () => {
    const { result } = renderHook(
      () => {
        const { cartItems, cartItemsQuerySuccess } = useCartItems();
        const { deleteCartItem, isDeleteCartItemSuccess } = useDeleteCartItem();

        return {
          deleteCartItem,
          isDeleteCartItemSuccess,
          cartItems,
          cartItemsQuerySuccess,
        };
      },
      { wrapper: queryWrapper },
    );

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
    });

    const socksCartId = 11295; // 양말의 장바구니 ID

    act(() => {
      result.current.deleteCartItem(socksCartId);
    });

    await waitFor(() => {
      expect(result.current.isDeleteCartItemSuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
      expect(result.current.cartItems).toEqual(
        cartItems.content.filter((cartItem) => cartItem.id !== socksCartId),
      );
    });
  });

  it('장바구니에서 상품을 장바구니 ID로 제거할 때, 존재하지 않는 ID라면 에러를 받는다', async () => {
    const { result } = renderHook(
      () => {
        const { deleteCartItem, isDeleteCartItemError } = useDeleteCartItem();

        return {
          deleteCartItem,
          isDeleteCartItemError,
        };
      },
      { wrapper: queryWrapper },
    );

    const inValidCartId = 1; // 존재하지 않는 cart ID

    act(() => {
      result.current.deleteCartItem(inValidCartId);
    });

    await waitFor(() => {
      expect(result.current.isDeleteCartItemError).toBe(true);
    });
  });
});
