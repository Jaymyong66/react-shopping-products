import ProductItem from './ProductItem';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';
import useProducts from '@/hooks/useProducts';
import { CartItemType } from '@/types';
import { useToast } from '@/hooks/useToast';
import { ERROR } from '@/constant/message';
import { useEffect } from 'react';

interface Props {
  selectBarCondition: Record<string, string>;
  cartItems: CartItemType[];
}

const ProductItemList = ({ selectBarCondition, cartItems }: Props) => {
  const { products, fetchNextPage, isProductsQueryFetching, isProductsQueryError } = useProducts({
    selectBarCondition,
  });
  const { showToast } = useToast();
  const { lastProductElementRef } = useInfinityScroll({ onIntersect: fetchNextPage });

  useEffect(() => {
    if (isProductsQueryError) {
      showToast({ message: ERROR.fetchProductList, duration: 3000 });
    }
  }, [isProductsQueryError, showToast]);

  return (
    <>
      <div className={styles.productItemListContainer}>
        {products.length === 0 && !isProductsQueryFetching && <div>상품 목록이 비었어요.</div>}
        {products.map((item, idx) => {
          const cartItem = cartItems.find((cartItem) => {
            return cartItem.product.id === item.id;
          });

          return (
            <ProductItem
              key={`item-${item.id}-${idx}`}
              item={item}
              cartItem={cartItem as CartItemType}
            />
          );
        })}
        {products.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
      </div>
      {isProductsQueryFetching && <Loader />}
    </>
  );
};

export default ProductItemList;
