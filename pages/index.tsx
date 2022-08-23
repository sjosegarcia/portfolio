import React, { FC } from "react";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import Services from "../components/Services";

const Home: FC = () => {
  return (
    <>
      <Hero />
      <Services />
      <Contact />
      <Newsletter />
    </>
  );
};

export default Home;
