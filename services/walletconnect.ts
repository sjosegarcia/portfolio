import { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useWalletConnect = (): [
  WalletConnectProvider | null,
  () => Promise<void>,
  () => Promise<void>
] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [walletConnect, setWalletConnectProvider] =
    useState<WalletConnectProvider | null>(null);

  const createWalletProvider = async (): Promise<WalletConnectProvider> => {
    const provider = new WalletConnectProvider({
      rpc: { 5: process.env.NEXT_PUBLIC_GOERLI_URL || "" },
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "",
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    setWalletConnectProvider(provider);
    return provider;
  };

  const openWalletConnect = async () => {
    const provider = await createWalletProvider();
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    await provider?.enable().catch((_) => {});
    setWalletConnectProvider(provider);
  };

  const disconnect = async () => {
    await walletConnect?.disconnect();
    setWalletConnectProvider(null);
  };

  return [walletConnect, openWalletConnect, disconnect];
};

export default useWalletConnect;
