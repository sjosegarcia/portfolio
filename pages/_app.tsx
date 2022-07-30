import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
