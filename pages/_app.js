import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';
import { ModalContextProvider } from '../store/modal-context';

import { NotificationContextProvider } from '../store/nottification-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <ModalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalContextProvider>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
