import { Toaster } from 'react-hot-toast';
import GlobalContextProvider from '../state/context/GlobalContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Toaster />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}

export default MyApp;
