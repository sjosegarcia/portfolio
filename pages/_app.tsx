import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <div className="ml-[3.35rem] md:ml-[20rem] flex flex-col">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
