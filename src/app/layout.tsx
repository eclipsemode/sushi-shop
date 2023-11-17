import '@assets/styles/app.scss';
import React from 'react';
import Providers from '@providers/with-providers';
import Header from '@components/Header';
import Footer from '@components/Footer';
import ToTopArrow from '@components/ToTopArrow';
import composeScripts from '@shared/utils/composeScripts';
import { FoodSoulScript } from '@app/(scripts)/_foodSoul';
import MaterialDialog from '@store/features/materialDialog/ui';
import styles from './index.module.scss';

export const metadata = {
  title: 'Лайм - доставка суши и пиццы',
  description: 'Generated by create next app',
  icons: {
    icon: '/images/favicon.ico',
    shortcut: '/images/favicon.ico',
    apple: '/images/favicon.ico',
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const Scripts = composeScripts([
    FoodSoulScript
  ])

  const Globals = composeScripts([
    MaterialDialog,
    ToTopArrow
  ])

  return (
    <html lang="ru">
      <body className={styles.App}>
        <Providers>
          <Header />
          <main className={styles.content}>{children}</main>
          <Footer />
          <Globals />
        </Providers>
        <Scripts />
      </body>
    </html>
  );
};

export default RootLayout;
