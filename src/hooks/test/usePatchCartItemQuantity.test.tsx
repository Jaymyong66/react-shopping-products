import { act, renderHook, waitFor } from '@testing-library/react';
import { queryWrapper } from './wrapper.util';
import useCartItems from '../useCartItems';
import usePatchCartItemQuantity from '../usePatchCartItemQuantity';

describe('usePatchCartItemQuantity 훅 테스트', () => {
  it('장바구니 ID 11294와 수량 2로 해당 상품의 장바구니 수량을 변경시킨다', async () => {
    const { result } = renderHook(
      () => {
        const { cartItems, cartItemsQuerySuccess } = useCartItems();
        const { patchCartItemQuantity, isPatchCartItemQuantitySuccess } =
          usePatchCartItemQuantity();

        return {
          patchCartItemQuantity,
          isPatchCartItemQuantitySuccess,
          cartItems,
          cartItemsQuerySuccess,
        };
      },
      { wrapper: queryWrapper },
    );

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
    });

    const socksCartId = 11295;
    const newQuantity = 2;

    act(() => {
      result.current.patchCartItemQuantity({ cartItemId: socksCartId, newQuantity });
    });

    await waitFor(() => {
      expect(result.current.isPatchCartItemQuantitySuccess).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);

      const newSocksQuantity = result.current.cartItems?.find(
        (item) => item.id === socksCartId,
      )?.quantity;

      expect(newSocksQuantity).toBe(newQuantity);
    });
  });

  it('장바구니 상품의 수량을 변경할 때, 존재하지 않는 장바구니 ID라면 에러를 받는다', async () => {
    const { result } = renderHook(
      () => {
        const {
          patchCartItemQuantity,
          isPatchCartItemQuantitySuccess,
          isPatchCartItemQuantityError,
        } = usePatchCartItemQuantity();

        return {
          patchCartItemQuantity,
          isPatchCartItemQuantitySuccess,
          isPatchCartItemQuantityError,
        };
      },
      { wrapper: queryWrapper },
    );

    const inValidCartId = 1;
    const newQuantity = 2;

    act(() => {
      result.current.patchCartItemQuantity({ cartItemId: inValidCartId, newQuantity });
    });

    await waitFor(() => {
      expect(result.current.isPatchCartItemQuantityError).toBe(true);
    });
  });
});
