import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <li className={styles.ball}></li>
        <li className={styles.ball}></li>
        <li className={styles.ball}></li>
      </div>
    </div>
  );
};

export default Loader;
