import { ToastProvider } from './../context/ToastProvider';
import { renderHook, waitFor } from '@testing-library/react';
import { useProductFetch } from './useProductFetch';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('초기 렌더링 시, 전체 목록 중 20개의 상품 목록을 가져온다.', async () => {
      const selectBarCondition = {
        category: 'all',
        sort: 'priceAsc',
      };
      const { result } = renderHook(() => useProductFetch({ selectBarCondition }), {
        wrapper: ToastProvider,
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });
  });
});
