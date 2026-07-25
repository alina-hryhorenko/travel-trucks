import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero.jpg"
        alt="Camper van on the road"
        fill
        priority
        sizes="100vw"
        className={styles.image}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.textGroup}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>You can find everything you want in our catalog</p>
        </div>
        <Link href="/catalog" className={styles.cta}>
          View Now
        </Link>
      </div>
    </section>
  );
}
