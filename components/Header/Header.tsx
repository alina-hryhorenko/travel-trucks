'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoBold}>Travel</span>
          <span className={styles.logoRegular}>Trucks</span>
        </Link>
        <nav>
          <ul className={styles.navList}>
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
