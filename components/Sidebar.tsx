import React, { FC } from "react";
import { RiHome7Fill, RiContactsBookUploadLine } from "react-icons/ri";
import Link from "next/link";
import SidebarButton from "./SidebarButton";
import useWalletConnect from "../services/walletconnect";

const Sidebar: FC = () => {
  const [walletConnect, openWalletConnect, disconnect] = useWalletConnect();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const proFeatureText = () => (
    <span className="z-10 inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
      Pro
    </span>
  );

  const connectIcon = (rotate: boolean) => (
    <svg
      aria-hidden="true"
      className={`flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
        rotate ? "-rotate-180" : ""
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  const displayConnectButton = () => {
    return walletConnect?.connected !== undefined &&
      !walletConnect?.connected ? (
      <SidebarButton
        onClick={async () => await disconnect()}
        text="Disconnect"
        icon={connectIcon(true)}
      />
    ) : (
      <SidebarButton
        onClick={async () => await openWalletConnect()}
        text="Connect"
        icon={connectIcon(false)}
      />
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notificationIndicator = (notifications: number) => (
    <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
      {notifications}
    </span>
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dropDownCTA = () => (
    <div
      id="dropdown-cta"
      className="p-4 mt-6 bg-blue-50 rounded-lg dark:bg-blue-900"
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          Beta
        </span>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-900 rounded-lg focus:ring-2 focus:ring-blue-400 p-1 hover:bg-blue-200 inline-flex h-6 w-6 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
          data-collapse-toggle="dropdown-cta"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
        Preview the new Flowbite dashboard navigation! You can turn the new
        navigation off for a limited time in your profile.
      </p>
      <a
        className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        href="#"
      >
        Turn new navigation off
      </a>
    </div>
  );

  return (
    <div className="sidebar container-snap fixed w-48 sm:w-64 z-10 h-full overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2">
        <li>
          <Link href="/">
            <div>
              <SidebarButton
                text="Home"
                icon={
                  <RiHome7Fill
                    size={20}
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                }
              />
            </div>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <div>
              <SidebarButton
                text="Contact"
                icon={
                  <RiContactsBookUploadLine
                    size={20}
                    className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  />
                }
              />
            </div>
          </Link>
        </li>
        <li>{displayConnectButton()}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
