import { Modal } from '@jaymyong66/simple-modal';
import { CartItemType } from '@/types';
import useDeleteCartItem from '@/hooks/queries/useDeleteCartItem';
import useCartItemQuantity from '@/hooks/useCartItemQuantity';
import Divider from '../Divider/Divider';
import Text from '../Text/Text';
import Stepper from '../Stepper/Stepper';
import styles from './CartModal.module.css';
import { useToast } from '@/hooks/useToast';
import { ERROR } from '@/constant/message';

interface Props {
  cartItems: CartItemType[];
  isOpen: boolean;
  handleToggle: () => void;
}

const CartModal = ({ cartItems, isOpen, handleToggle }: Props) => {
  const { showToast } = useToast();
  const { deleteCartItem } = useDeleteCartItem({
    onError: () => {
      showToast({ message: ERROR.deleteProduct, duration: 3000 });
    },
  });
  const { decreaseCartItemQuantity, increaseCartItemQuantity } = useCartItemQuantity();

  const totalAmount = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  return (
    <Modal
      size="large"
      position="bottom"
      isOpen={isOpen}
      onToggle={handleToggle}
      className={styles.modalContainer}
    >
      <Modal.ModalHeader title="장바구니" style={{ paddingBottom: '24px' }} />

      <Modal.ModalContent style={{ maxHeight: '60vh' }}>
        {cartItems.length === 0 && <div>장바구니가 비었어요.</div>}
        {cartItems.map((cartItem) => {
          return (
            <div key={`cartItem-${cartItem.id}`}>
              <Divider />
              <div className={styles.cartItemContainer}>
                <img
                  src={cartItem.product.imageUrl}
                  className={styles.cartItemImg}
                  alt="cartItem-image"
                />
                <div className={styles.cartItemInfoContainer}>
                  <Text.Subtitle>{cartItem.product.name}</Text.Subtitle>
                  <Text.Label>{`${cartItem.product.price.toLocaleString('KR-ko')}원`}</Text.Label>
                  <button
                    className={styles.cartItemDeleteButton}
                    onClick={() => deleteCartItem(cartItem.id)}
                  >
                    삭제
                  </button>
                  <div className={styles.stepperWrapper}>
                    <Stepper
                      value={cartItem.quantity}
                      handleClickMinus={() =>
                        decreaseCartItemQuantity(cartItem.id, cartItem.quantity)
                      }
                      handleClickPlus={() =>
                        increaseCartItemQuantity(cartItem.id, cartItem.quantity)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <Divider />
        <div className={styles.totalAmountContainer}>
          <Text.Subtitle>총 결제 금액</Text.Subtitle>
          <Text.Title>{`${totalAmount.toLocaleString('KR-ko')}원`}</Text.Title>
        </div>
      </Modal.ModalContent>

      <Modal.ModalFooter>
        <Modal.ModalButton variant="primary" onClick={handleToggle} style={{ width: '100%' }}>
          닫기
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default CartModal;
