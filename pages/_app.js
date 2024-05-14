import "@/styles/globals.css";
import 'keen-slider/keen-slider.min.css'
import 'regenerator-runtime/runtime';


export default function App({ Component, pageProps }) {
  return <>
  <link rel="icon" href="@/public/favicon.ico" sizes="any" />
   <Component {...pageProps} />
  </>
} 