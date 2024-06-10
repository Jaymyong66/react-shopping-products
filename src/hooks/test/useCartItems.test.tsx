import { renderHook, waitFor } from '@testing-library/react';
import useCartItems from '../useCartItems';
import cartItems from '@/mocks/cartItems.json';
import { queryWrapper } from './wrapper.util';

describe('useCartItems 훅 테스트', () => {
  it('장바구니 상품 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper: queryWrapper });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
      expect(result.current.cartItems).toEqual(cartItems.content);
    });
  });
});
