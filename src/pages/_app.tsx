import { type AppType } from "next/dist/shared/lib/utils";
import {NextIntlProvider} from 'next-intl'; 

import "../styles/globals.css";

const MyApp: AppType<{ messages: IntlMessages }> = ({ Component, pageProps }) => {
  return <NextIntlProvider messages={pageProps.messages}> <Component {...pageProps} /> </NextIntlProvider>;
};

export default MyApp;
