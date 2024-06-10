import { HtmlHTMLAttributes } from 'react';
import { CartItemType, ProductType } from '@/types';
import useAddCartItem from '@/hooks/useAddCartItem';
import useDeleteCartItem from '@/hooks/useDeleteCartItem';
import useCartItemQuantity from '@/hooks/useCartItemQuantity';
import Stepper from '@/components/Stepper/Stepper';
import ProductSelectButton from './ProductSelectButton';
import styles from '../ProductListPage.module.css';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  product: ProductType;
  cartItem: CartItemType;
}

const ProductItem = ({ product, cartItem }: Props) => {
  const { addCartItem } = useAddCartItem();
  const { deleteCartItem } = useDeleteCartItem();
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
