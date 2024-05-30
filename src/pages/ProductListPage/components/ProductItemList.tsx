import ProductItem from './ProductItem';
import useProducts from '../../../hooks/useProducts';
import { useInfinityScroll } from '../../../hooks/useInfinityScroll';
import Loader from '../../../components/Loader/Loader';
import styles from '../ProductListPage.module.css';

interface Props {
  handleCount: (cartItemCount: number) => void;
  selectBarCondition: Record<string, string>;
}

const ProductItemList = ({ handleCount, selectBarCondition }: Props) => {
  const { products, setPage, hasMore, selectedItems, handleSelect, isLoading } = useProducts({
    selectBarCondition,
    handleCount,
  });
  const { lastProductElementRef } = useInfinityScroll({ hasMore, setPage });

  return (
    <>
      <div className={styles.productItemListContainer}>
        {products.map((item, idx) => {
          return (
            <ProductItem
              key={`item-${item.id}-${idx}`}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={() => {
                handleSelect(item.id);
              }}
            />
          );
        })}
        {products.length !== 0 && <p style={{ height: '10px' }} ref={lastProductElementRef}></p>}
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default ProductItemList;
