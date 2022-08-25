import React, { FC, Fragment, MouseEventHandler } from "react";
import { shortenAddress } from "../settings";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
interface WalletAddressBoxProps {
  address?: string;
  onDisconnect?: MouseEventHandler;
}

const WalletAddressDropDown: FC<WalletAddressBoxProps> = ({
  address,
  onDisconnect,
}) => {
  return address ? (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md md:mt-0 md:ml-4 bg-gray-900 space-x-2">
        <span className="justify-center">{shortenAddress(address)}</span>
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={
                    active
                      ? "bg-gray-600 text-white block px-4 py-2 text-md cursor-pointer"
                      : "text-white block px-4 py-2 text-md cursor-pointer"
                  }
                >
                  <Link href="/dashboard">Dashboard</Link>
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={
                    active
                      ? "bg-gray-600 text-white block px-4 py-2 text-md cursor-pointer"
                      : "text-white block px-4 py-2 text-md cursor-pointer"
                  }
                  onClick={onDisconnect}
                >
                  Disconnect
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <></>
  );
};

export default WalletAddressDropDown;
