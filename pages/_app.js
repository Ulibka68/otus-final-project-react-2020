import { Provider } from "next-auth/client";

// eslint-disable-next-line no-restricted-syntax
export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
