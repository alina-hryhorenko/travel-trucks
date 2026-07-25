import type { ReactNode } from 'react';
import styles from './Badge.module.css';

interface BadgeProps {
  icon: ReactNode;
  label: string;
}

export function Badge({ icon, label }: BadgeProps) {
  return (
    <span className={styles.badge}>
      {icon}
      {label}
    </span>
  );
}
