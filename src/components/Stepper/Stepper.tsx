import minusIcon from '@/assets/minusIcon.png';
import plusIcon from '@/assets/plusIcon.png';
import styles from './Stepper.module.css';

interface Props {
  value: number;
  handleClickPlus: () => void;
  handleClickMinus: () => void;
}

const Stepper = ({ value, handleClickPlus, handleClickMinus }: Props) => {
  return (
    <div className={styles.stepperContainer}>
      <button className={styles.stepperButton} onClick={handleClickMinus}>
        <img
          src={minusIcon}
          className={styles.stepperButtonImg}
          alt="cartItem-quantity-minus-icon"
        />
      </button>
      <span className={styles.stepperValue}>{value}</span>
      <button className={styles.stepperButton} onClick={handleClickPlus}>
        <img src={plusIcon} className={styles.stepperButtonImg} alt="cartItem-quantity-plus-icon" />
      </button>
    </div>
  );
};

export default Stepper;
