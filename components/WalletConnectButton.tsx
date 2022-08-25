import React, { FC, MouseEventHandler } from "react";

interface WalletConnectButtonProps {
  isLoggedIn: boolean;
  onOpen?: MouseEventHandler;
}

const WalletConnectButton: FC<WalletConnectButtonProps> = ({
  isLoggedIn,
  onOpen,
}) => {
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

  return !isLoggedIn ? (
    <div
      className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md md:mt-0 md:ml-4 bg-gray-900 cursor-pointer space-x-2"
      onClick={onOpen}
    >
      <span className="justify-center">Connect</span>
      {connectIcon(false)}
    </div>
  ) : (
    <></>
  );
};

export default WalletConnectButton;
