import { useEffect, useState } from 'react';
import ProductItemList from './components/ProductItemList';
import ProductListHeader from './components/ProductListHeader';
import ProductListSelectBar from './components/ProductListSelectBar';
import ProductListTitle from './components/ProductListTitle';
import useCartItems from '@/hooks/useCartItems';
import CartModal from '@/components/CartModal/CartModal';
import styles from './ProductListPage.module.css';
import { useToast } from '@/hooks/useToast';
import { ERROR } from '@/constant/message';

const ProductListPage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectBarCondition, setSelectBarCondition] = useState({
    category: 'all',
    sort: 'priceAsc',
  });
  const { cartItems, cartItemsQueryError } = useCartItems();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (cartItemsQueryError) {
      showToast({ message: ERROR.fetchCartItems, duration: 3000 });
    }
  }, [cartItemsQueryError, showToast]);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const handleSelectBarCondition = (filter: string, condition: string) => {
    const newCondition = { ...selectBarCondition, [filter]: condition };
    setSelectBarCondition(newCondition);
  };

  return (
    <div className={styles.productListPageContainer}>
      <ProductListHeader
        cartItemCount={cartItemCount}
        handleHeaderButton={() => setIsModalOpen(!isModalOpen)}
      />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
        <ProductListSelectBar handleSelectBarCondition={handleSelectBarCondition} />
        <ProductItemList selectBarCondition={selectBarCondition} cartItems={cartItems} />
      </div>
      <CartModal
        cartItems={cartItems}
        isOpen={isModalOpen}
        handleToggle={() => setIsModalOpen(!isModalOpen)}
      />
    </div>
  );
};

export default ProductListPage;
