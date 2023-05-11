import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "~/styles/globals.scss";
import "leaflet/dist/leaflet.css";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { persistor, store } from "~/redux/store";

import type { AppProps } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer autoClose={3000} />
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
