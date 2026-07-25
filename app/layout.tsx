import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Header } from '@/components/Header/Header';
import { Providers } from './providers';
import styles from './layout.module.css';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'TravelTrucks — Camper Rental',
    template: '%s | TravelTrucks',
  },
  description: 'Rent the perfect camper van for your next adventure with TravelTrucks.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={styles.body}>
        <Providers>
          <Header />
          <main className={styles.main}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
