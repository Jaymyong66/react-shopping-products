import { useState } from 'react';
import ProductItemList from './components/ProductItemList';
import ProductListHeader from './components/ProductListHeader';
import ProductListSelectBar from './components/ProductListSelectBar';
import ProductListTitle from './components/ProductListTitle';
import styles from './ProductListPage.module.css';

const ProductListPage = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [selectBarCondition, setSelectBarCondition] = useState({
    category: 'all',
    sort: 'priceAsc',
  });

  const handleCount = (cartItemCount: number) => {
    setCartItemCount(cartItemCount);
  };

  const handleSelectBarCondition = (filter: string, condition: string) => {
    const newCondition = { ...selectBarCondition, [filter]: condition };
    setSelectBarCondition(newCondition);
  };

  return (
    <div>
      <ProductListHeader cartItemCount={cartItemCount} />
      <div className={styles.productContentContainer}>
        <ProductListTitle />
        <ProductListSelectBar handleSelectBarCondition={handleSelectBarCondition} />
        <ProductItemList selectBarCondition={selectBarCondition} handleCount={handleCount} />
      </div>
    </div>
  );
};

export default ProductListPage;
