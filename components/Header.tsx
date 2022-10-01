import Link from "next/link";
import React, { FC, useState } from "react";
import { useWalletConnect } from "../bloc/hooks/walletconnect.hook";
import {
  Bars4Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { shortenAddress } from "../settings";

const Header: FC = () => {
  const walletConnect = useWalletConnect();
  const walletConnectState = walletConnect.state;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const loginFlow = () =>
    !navbarOpen ? (
      !walletConnect.isLoggedIn ? (
        <Bars4Icon
          className="h-20 w-20 text-black cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none"
          onClick={() => setNavbarOpen(!navbarOpen)}
        />
      ) : (
        <div
          className="md:hidden inline-flex items-center px-8 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-xl md:mt-0 md:ml-4 bg-gray-900 cursor-pointer space-x-2"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          <span className="justify-center">
            {walletConnectState.provider?.accounts[0]
              ? shortenAddress(
                  walletConnectState.provider?.accounts[0]
                    ? walletConnectState.provider?.accounts[0]
                    : ""
                )
              : ""}
          </span>
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </div>
      )
    ) : (
      <XMarkIcon
        className="h-20 w-20 text-black cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none"
        onClick={() => setNavbarOpen(!navbarOpen)}
      />
    );

  return (
    <div
      className="fixed top-0 w-full z-30 clearNav md:bg-opacity-90 transition duration-300 ease-in-out"
      onClick={() => {
        if (navbarOpen) setNavbarOpen(!navbarOpen);
      }}
    >
      <div className="flex flex-col max-w-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between p-4">
          <Link href="/">
            <div className="text-lg font-semibold rounded-lg tracking-widest focus:outline-none focus:shadow-outline cursor-pointer">
              <h1 className="text-4xl Avenir tracking-tighter text-gray-900 md:text-4x1 lg:text-3xl">
                GODZ
              </h1>
            </div>
          </Link>
          {loginFlow()}
        </div>

        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex h-screen md:h-fit" : " hidden")
          }
        >
          <nav
            className={(navbarOpen ? "flex-row" : "flex-col") + " flex-grow"}
          >
            <ul
              className={
                "flex flex-wrap items-center " +
                (navbarOpen
                  ? "flex-col justify-center text-5xl space-y-4 md:flex-row md:space-y-0 md:text-base md:justify-end"
                  : "md:flex-row md:space-y-0 md:text-base md:justify-end")
              }
            >
              <li>
                <Link href="/#services">
                  <div className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer">
                    Services
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/#contact">
                  <div className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer">
                    Contact Us
                  </div>
                </Link>
              </li>
              {!walletConnect.isLoggedIn ? (
                <li>
                  <div
                    className="font-medium text-white hover:text-gray-600 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer bg-gray-900 rounded-lg"
                    onClick={async () => {
                      await walletConnect.onOpen();
                      setNavbarOpen(false);
                    }}
                  >
                    Connect
                  </div>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/dashboard">
                      <div className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer">
                        Dashboard
                      </div>
                    </Link>
                  </li>
                  <li>
                    <div
                      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out cursor-pointer"
                      onClick={async () => {
                        await walletConnect.onClose();
                        setNavbarOpen(false);
                      }}
                    >
                      Disconnect
                    </div>
                  </li>
                  <li>
                    <div className="font-medium text-white hover:text-gray-600 px-2 py-2 flex items-center transition duration-150 ease-in-out cursor-pointer bg-gray-900 rounded-lg">
                      {walletConnectState.provider?.accounts[0]
                        ? shortenAddress(
                            walletConnectState.provider?.accounts[0]
                              ? walletConnectState.provider?.accounts[0]
                              : ""
                          )
                        : ""}
                    </div>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
