import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
  className?: string;
  label?: string;
  trackColor?: string;
  activeColor?: string;
}

export function Loader({
  size = 40,
  className = '',
  label = 'Loading',
  trackColor,
  activeColor,
}: LoaderProps) {
  return (
    <div className={`${styles.loader} ${className}`.trim()} role="status" aria-label={label}>
      <span
        className={styles.spinner}
        style={{
          width: size,
          height: size,
          borderColor: trackColor,
          borderTopColor: activeColor,
        }}
      />
      <span className={styles.srOnly}>{label}</span>
    </div>
  );
}
