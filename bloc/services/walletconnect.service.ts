import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  walletConnectStore,
  WalletConnectStore,
} from "../store/walletconnect.store";

export class WalletConnectService {
  constructor(private walletConnectStore: WalletConnectStore) {}

  private createWalletProvider = (): WalletConnectProvider =>
    new WalletConnectProvider({
      rpc: { 5: process.env.NEXT_PUBLIC_GOERLI_URL || "" },
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "",
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });

  openWalletConnect = async (): Promise<void> => {
    const provider = this.createWalletProvider();
    this.walletConnectStore.setLoading(true);
    await provider
      ?.enable()
      .catch((error) => this.walletConnectStore.setError(error));
    this.walletConnectStore.update({ provider: provider });
    this.walletConnectStore.setLoading(false);
  };

  closeWalletConnect = async (): Promise<void> => {
    //const provider = this.walletConnectStore.getValue().provider;
    this.walletConnectStore.setLoading(true);
    //await provider?.disconnect();
    this.walletConnectStore.update({ provider: null });
    this.walletConnectStore.setLoading(false);
  };
}

export const walletConnectService = new WalletConnectService(
  walletConnectStore
);
