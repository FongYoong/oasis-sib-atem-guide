  
import { ChakraProvider, Box } from "@chakra-ui/react";
import { customTheme } from "../styles/theme.js";
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => {
  NProgress.done();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
})
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Box pb="16" bg="black" >
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" type="text/css" href="/nprogress/nprogress.css" /> {/* Import CSS for nprogress */}
        </Head>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}

export default MyApp