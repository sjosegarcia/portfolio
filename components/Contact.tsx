import React, { FC, FormEvent, useState } from "react";
import web3FormPublicAccessKey from "../settings";

const Contact: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const submitToWeb3Form = async (e: FormEvent<HTMLDivElement>) => {
    if (name.length === 0 && email.length === 0 && message.length === 0) return;
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormPublicAccessKey,
        name: name,
        email: email,
        message: message,
      }),
    });
    const result = await response.json();
    if (!result.success) {
      console.log(result);
    }
  };

  return (
    <div id="contact">
      <div className="flex flex-col text-center justify-start bg-white">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="text-center mb-8 text-6xl Avenir font-semibold text-gray-900">
            Contact us
          </h1>
          <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600 text-center">
            Fill out the form below with your request
          </h1>
          <ul>
            <input
              placeholder="Big Papi"
              name="name"
              type="name"
              autoComplete="name"
              onChange={(e) => setName(e.currentTarget.value)}
              className="border border-gray-600 w-1/2 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
            ></input>
          </ul>
          <ul>
            <input
              placeholder="bigpapi@papalon.com"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="border border-gray-600 w-1/2 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
            ></input>
          </ul>
          <ul>
            <textarea
              name="message"
              rows={5}
              className="border border-gray-600 w-1/2 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-900"
              placeholder="Type your message"
              onChange={(e) => setMessage(e.currentTarget.value)}
            ></textarea>
          </ul>
          <ul>
            <div
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900 cursor-pointer"
              onClick={submitToWeb3Form}
            >
              <span className="justify-center">Submit</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
