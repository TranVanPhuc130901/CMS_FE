import Header from '@/components/Header'
import Login from '@/pages/login'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';

import { useRouter } from 'next/router'
import store from '@/sagas/configureStoreSaga';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Kiểm tra nếu là trang login, không hiển thị Navbar và Header
  if (router.pathname === '/login') {
    return (
      <div>
        <Component {...pageProps} />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <div>
      <div className='w-full bg-[#242322] shadow-hd'>
        <Header />
      </div>
      <div className='w-full'>
        <div className='flex w-full'>
          <Navbar />
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer/>
    </div>
    </Provider>
  );
}
  