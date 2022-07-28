import React from "react";
import Head from 'next/head'
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Portfolio Website</title>
      </Head>
      <Hero />
    </div>
  );
};

export default Home;