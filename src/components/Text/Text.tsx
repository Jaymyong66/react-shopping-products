import { PropsWithChildren } from 'react';
import styles from './Text.module.css';

export default function Text({ children }: PropsWithChildren) {
  return <>{children}</>;
}

Text.Title = function Title({ children }: PropsWithChildren) {
  return <h1 className={styles.titleText}>{children}</h1>;
};

Text.Subtitle = function Subtitle({ children }: PropsWithChildren) {
  return <span className={styles.subtitleText}>{children}</span>;
};

Text.Caption = function Caption({ children }: PropsWithChildren) {
  return <span className={styles.captionText}>{children}</span>;
};

Text.Label = function Label({ children }: PropsWithChildren) {
  return <span className={styles.labelText}>{children}</span>;
};
