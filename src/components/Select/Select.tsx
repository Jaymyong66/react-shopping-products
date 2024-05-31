import { SelectHTMLAttributes, PropsWithChildren } from 'react';
import styles from './Select.module.css';

interface Props extends PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>> {
  options: Record<string, string>;
}

const Select = ({ options, defaultValue, children, ...props }: Props) => {
  return (
    <select {...props} className={styles.selectContainer} defaultValue={defaultValue}>
      {children}
      {Object.keys(options).map((option) => (
        <option key={option} value={option}>
          {options[option]}
        </option>
      ))}
    </select>
  );
};

export default Select;
