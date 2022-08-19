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
    <div>
      <div className="flex min-h-screen items-center justify-start bg-white">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-center mb-8 text-6xl Avenir font-semibold text-gray-900">
            Contact us
          </h1>
          <h1 className="mb-8 text-2xl Avenir font-semibold text-gray-600 text-center">
            Fill out the form below with your request
          </h1>

          <form className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative z-0">
                <input
                  type="text"
                  name="name"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  onChange={(e) => setName(e.currentTarget.value)}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your name
                </label>
              </div>
              <div className="relative z-0">
                <input
                  type="text"
                  name="email"
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your email
                </label>
              </div>
              <div className="relative z-0 col-span-2">
                <textarea
                  name="message"
                  rows={5}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=" "
                  onChange={(e) => setMessage(e.currentTarget.value)}
                ></textarea>
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  Your message
                </label>
              </div>
            </div>
            <div
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-gray-900 cursor-pointer"
              onClick={submitToWeb3Form}
            >
              <span className="justify-center">Send Message</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
