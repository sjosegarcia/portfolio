import React, { FC } from "react";

const Newsletter: FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
      <div className="py-24 md:py-36">
        <h1 className="mb-5 text-6xl Avenir font-semibold text-gray-900">
          Subscribe to our newsletter
        </h1>
        <h1 className="mb-9 text-2xl font-semibold text-gray-600">
          Enter your email address and get our newsletters straight away.
        </h1>
        <input
          placeholder="bigpapi@papalon.com"
          name="email"
          type="email"
          autoComplete="email"
          className="border border-gray-600 w-1/3 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
        ></input>{" "}
        <div className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900 cursor-pointer">
          <span className="justify-center">Subscribe</span>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
