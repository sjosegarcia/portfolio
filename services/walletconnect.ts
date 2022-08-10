import { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useWalletConnect = (): [
  WalletConnectProvider | null,
  () => Promise<WalletConnectProvider>,
  () => Promise<void>
] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [walletConnect, setWalletConnect] =
    useState<WalletConnectProvider | null>(null);

  const createWalletProvider = async (): Promise<WalletConnectProvider> => {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: { 5: process.env.NEXT_PUBLIC_GOERLI_URL || "" },
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "",
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    setWalletConnect(walletConnectProvider);
    return walletConnectProvider;
  };

  const openWalletConnect = async () => {
    console.log(walletConnect);
    setWalletConnect(await createWalletProvider());
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    if (walletConnect) await walletConnect.enable().catch((_) => {});
  };
  return [walletConnect, createWalletProvider, openWalletConnect];
};

export default useWalletConnect;
