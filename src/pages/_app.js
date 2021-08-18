import { Provider } from 'react-redux';
import { store } from '../app/store';
import '../styles/globals.css';
import { Provider as AuthProvider } from "next-auth/client";

/* Give app access to authentication state with AuthProvider high-order component: */

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={ pageProps.session }>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  
  )
}

export default MyApp
