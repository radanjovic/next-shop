import '../styles/globals.css'
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import CartProvider from '../context';


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return <>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='author' content='Radan Jovic' />
      <title>NextShop</title>
    </Head>
    
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    
  </>
  
  
}

export default MyApp
