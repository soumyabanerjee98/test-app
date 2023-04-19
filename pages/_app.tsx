import { configureStore } from "@/store/store";
import "./style.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const { store } = configureStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
