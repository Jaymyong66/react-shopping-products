import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './HeaderButton.module.css';

interface Props extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {}

const HeaderButton = ({ children, ...props }: Props) => {
  return (
    <button className={styles.headerButtonWrapper} {...props}>
      {children}
    </button>
  );
};

export default HeaderButton;
