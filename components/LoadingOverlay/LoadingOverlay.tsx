import styles from './LoadingOverlay.module.css';

export function LoadingOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <span className={styles.spinner} aria-hidden="true" />
        <h3 className={styles.title}>Loading tracks...</h3>
        <p className={styles.subtitle}>Please wait while we fetch the best travel trucks for you</p>
      </div>
    </div>
  );
}
