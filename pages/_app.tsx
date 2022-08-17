import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { enableAkitaProdMode } from "@datorama/akita";

enableAkitaProdMode();
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Sidebar />
      <div className="sidebar ml-[12rem] sm:ml-[16rem] flex flex-col">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
