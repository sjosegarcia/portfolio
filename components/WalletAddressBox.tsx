import React, { FC } from "react";
import { shortenAddress } from "../settings";

interface WalletAddressBoxProps {
  address?: string;
}

const WalletAddressBox: FC<WalletAddressBoxProps> = ({ address }) => {
  return address ? (
    <div className="inline-flex items-center px-4 py-2 mt-2 font-medium text-white transition duration-500 ease-in-out transform bg-transparent rounded-lg text-md md:mt-0 md:ml-4 bg-gray-900 cursor-pointer space-x-2">
      <span className="justify-center">{shortenAddress(address)}</span>
    </div>
  ) : (
    <></>
  );
};

export default WalletAddressBox;
