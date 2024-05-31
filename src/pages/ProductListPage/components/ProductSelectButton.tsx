import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import addCartIcon from '../../../assets/addCartIcon.png';
import removeCartIcon from '../../../assets/removeCartIcon.png';
import styles from '../ProductListPage.module.css';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  isSelected: boolean;
}

const ProductSelectButton = ({ isSelected, ...props }: Props) => {
  const buttonStyle = isSelected ? 'remove' : 'add';

  return (
    <button className={`${styles.productCartButton} ${styles[buttonStyle]}`} {...props}>
      {isSelected ? (
        <>
          <img src={removeCartIcon} width={14} height={14} />
          빼기
        </>
      ) : (
        <>
          <img src={addCartIcon} width={14} height={14} />
          담기
        </>
      )}
    </button>
  );
};

export default ProductSelectButton;
