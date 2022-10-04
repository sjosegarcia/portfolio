import { switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";

const web3FormPublicAccessKey = "2be134fe-0a11-4020-908a-eba5ec79e0ba";

export const shortenAddress = (address: string): string => {
  if (address.length < 1) return "";
  return (
    address.slice(0, 5) +
    "..." +
    address.slice(address.length - 4, address.length)
  );
};
export default web3FormPublicAccessKey;

export const getAbi$ = async (address: string) => {
  const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`;
  return fromFetch(url).pipe(switchMap((response) => response.json()));
};
