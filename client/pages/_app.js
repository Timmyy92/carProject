import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context';


export default function App({ Component, pageProps }) {
  return (
    <UserProvider>

      <ToastContainer position='top-center' />
      <Component {...pageProps} />
    </UserProvider>

  )

}
