import Select from '../../../components/Select/Select';
import { productCategories, sortOptions } from '../../../constant/products';
import styles from '../ProductListPage.module.css';

interface Props {
  handleSelectBarCondition: (filter: string, condition: string) => void;
}

const ProductListSelectBar = ({ handleSelectBarCondition }: Props) => {
  return (
    <div className={styles.productSelectContainer}>
      <Select
        options={productCategories}
        defaultValue={Object.keys(productCategories)[0]}
        onChange={(e) => {
          handleSelectBarCondition('category', e.target.value);
        }}
      ></Select>
      <Select
        options={sortOptions}
        defaultValue={Object.keys(sortOptions)[0]}
        onChange={(e) => handleSelectBarCondition('sort', e.target.value)}
      />
    </div>
  );
};

export default ProductListSelectBar;
