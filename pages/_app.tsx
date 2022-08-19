import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import { enableAkitaProdMode } from "@datorama/akita";
import Header from "../components/Header";

enableAkitaProdMode();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default MyApp;
