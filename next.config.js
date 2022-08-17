/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;

const withTM = require("next-transpile-modules")(["@datorama/akita"]); // pass the modules you would like to see transpiled
module.exports = withTM({});
