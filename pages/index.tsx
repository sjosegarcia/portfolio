import React from "react";
import Head from "next/head";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Portfolio Website</title>
        <meta name="description" content="Generated by Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero heading="GODZ LLC" message="We are all young GODZ" />
    </div>
  );
};

export default Home;
