const web3FormPublicAccessKey = "2be134fe-0a11-4020-908a-eba5ec79e0ba";
export const shortenAddress = (address: string): string =>
  address.slice(0, 5) +
  "..." +
  address.slice(address.length - 4, address.length);
export default web3FormPublicAccessKey;
