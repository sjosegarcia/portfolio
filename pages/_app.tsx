import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar
        navRoutes={[
          { icon: null, route: "#", title: "zzz" },
          { icon: null, route: "#", title: "zzzzz" },
        ]}
      />
      <div className="sidebar ml-[3.35rem] md:ml-[20rem] flex flex-col">
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

export default MyApp;
