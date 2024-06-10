import { act, renderHook, waitFor } from '@testing-library/react';
import useAddCartItem from '../useAddCartItem';
import useCartItems from '../useCartItems';
import { queryWrapper } from './wrapper.util';

describe('useAddCartItem 훅 테스트', () => {
  it('장바구니에 상품을 상품 ID로 추가한다.', async () => {
    const { result } = renderHook(
      () => {
        const { cartItems, cartItemsQuerySuccess } = useCartItems();
        const { addCartItem, isAddCartItemSuccess } = useAddCartItem();

        return {
          addCartItem,
          isAddCartItemSuccess,
          cartItems,
          cartItemsQuerySuccess,
        };
      },
      { wrapper: queryWrapper },
    );

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
    });

    const sweaterProductId = 59;

    act(() => {
      result.current.addCartItem(sweaterProductId); // 스웨터 ID
    });

    await waitFor(() => {
      expect(result.current.isAddCartItemSuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
      expect(
        result.current.cartItems?.find((item) => item.product.id === sweaterProductId),
      ).toBeTruthy();
    });
  });

  it('장바구니에 상품을 상품 ID로 추가할 때, 존재하지 않는 상품 ID라면 에러를 받는다', async () => {
    const { result } = renderHook(
      () => {
        const { addCartItem, isAddCartItemError } = useAddCartItem();

        return {
          addCartItem,
          isAddCartItemError,
        };
      },
      { wrapper: queryWrapper },
    );

    act(() => {
      result.current.addCartItem(1000); // 존재하지 않는 product ID
    });

    await waitFor(() => {
      expect(result.current.isAddCartItemError).toBe(true);
    });
  });
});
