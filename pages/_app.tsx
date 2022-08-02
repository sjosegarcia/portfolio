import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import OtherSidebar from "../components/Sidebar";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <div className="sidebar ml-[16rem] flex flex-col">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
