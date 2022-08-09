import { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useWalletConnect = (): [WalletConnectProvider, () => Promise<void>] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [walletConnect, setWalletConnect] = useState<WalletConnectProvider>(
    new WalletConnectProvider({
      infuraId: `${process.env.INFURA_ID}`,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    })
  );

  const activate = () => {
    const walletConnectProvider = new WalletConnectProvider({
      infuraId: `${process.env.INFURA_ID}`,
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    setWalletConnect(walletConnectProvider);
  };

  const openWalletConnect = async () => {
    activate();
    try {
      await walletConnect.enable();
    } catch (e) {}
  };
  return [walletConnect, openWalletConnect];
};

export default useWalletConnect;
