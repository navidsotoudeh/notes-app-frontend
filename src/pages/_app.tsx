import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "@/store/store";

export function NotesApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(NotesApp);
