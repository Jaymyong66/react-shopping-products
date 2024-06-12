import { HtmlHTMLAttributes } from 'react';
import { CartItemType, ProductType } from '@/types';
import useAddCartItem from '@/hooks/queries/useAddCartItem';
import useDeleteCartItem from '@/hooks/queries/useDeleteCartItem';
import useCartItemQuantity from '@/hooks/useCartItemQuantity';
import Stepper from '@/components/Stepper/Stepper';
import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';
import { useToast } from '@/hooks/useToast';
import { ERROR } from '@/constant/message';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  product: ProductType;
  cartItem: CartItemType;
}

const ProductItem = ({ product, cartItem }: Props) => {
  const { showToast } = useToast();
  const { addCartItem } = useAddCartItem({
    onError: () => {
      showToast({ message: ERROR.addProduct, duration: 3000 });
    },
  });
  const { deleteCartItem } = useDeleteCartItem({
    onError: () => {
      showToast({ message: ERROR.deleteProduct, duration: 3000 });
    },
  });
  const { decreaseCartItemQuantity, increaseCartItemQuantity } = useCartItemQuantity();

  const { name, price, imageUrl } = product;
  const isInCart = cartItem ? true : false;

  return (
    <div className={styles.productItemContainer}>
      <img
        src={imageUrl}
        width={182}
        height={112}
        style={{ borderRadius: '8px 8px 0 0' }}
        alt="product-image"
      />
      <div className={styles.productItemInfoContainer}>
        <span className={styles.productItemName}>{name}</span>
        <span className={styles.productItemLabel}>{price.toLocaleString('KR-ko')}원</span>
      </div>

      <div className={styles.cartItemButtonWrapper}>
        {isInCart ? (
          <Stepper
            value={cartItem.quantity}
            handleClickMinus={() => decreaseCartItemQuantity(cartItem.id, cartItem.quantity)}
            handleClickPlus={() => increaseCartItemQuantity(cartItem.id, cartItem.quantity)}
          />
        ) : (
          <ProductSelectButton
            isSelected={isInCart}
            onClick={() => {
              cartItem ? deleteCartItem(cartItem.id) : addCartItem(product.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProductItem;
