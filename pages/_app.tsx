import type { AppProps } from 'next/app';
import Providers from '@/components/redux/Providers';
import MobileMenu from '@/components/navigation/MobileMenu';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <MobileMenu />
      <Component {...pageProps} />
    </Providers>
  );
}
