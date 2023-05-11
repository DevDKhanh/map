import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "~/styles/globals.scss";

import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { persistor, store } from "~/redux/store";

import type { AppProps } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ToastContainer autoClose={3000} />
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
}
