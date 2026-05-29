import { useRef } from 'react';
import Head from 'next/head';
import '../styles/globals.scss';
import { AppProvider } from '../contexts/AppContext';
import { TransitionProvider } from '../contexts/TransitionContext';
import MainLayout from '../components/layout/MainLayout';

function MyApp({ Component, pageProps }) {
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <AppProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <TransitionProvider pageWrapperRef={pageWrapperRef}>
        <MainLayout>
          <div ref={pageWrapperRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}>
            <Component {...pageProps} />
          </div>
        </MainLayout>
      </TransitionProvider>
    </AppProvider>
  );
}

export default MyApp;
