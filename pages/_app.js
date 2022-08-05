import { SessionProvider } from 'next-auth/react';
import Layout from '../components/layout/Layout';

import { NotificationContextProvider } from '../store/nottification-context';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
