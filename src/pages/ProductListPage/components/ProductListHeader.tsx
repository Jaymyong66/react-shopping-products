import HeaderButton from '../../../components/HeaderButton/HeaderButton';
import Header from '../../../components/Header/Header';
import cartIcon from '../../../assets/cartIcon.png';
import styles from '../ProductListPage.module.css';

interface Props {
  cartItemCount: number;
  handleHeaderButton: () => void;
}

const ProductListHeader = ({ cartItemCount, handleHeaderButton }: Props) => {
  return (
    <div>
      <Header>
        <HeaderButton>SHOP</HeaderButton>
        <HeaderButton onClick={handleHeaderButton}>
          {cartItemCount !== 0 && <div className={styles.cartItemCount}>{cartItemCount}</div>}
          <img src={cartIcon} width={20} height={24} alt="home-button-image" />
        </HeaderButton>
      </Header>
    </div>
  );
};

export default ProductListHeader;
