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
    await this.enableWalletConnect(provider);
    this.walletConnectStore.setLoading(false);
  };

  closeWalletConnect = async (): Promise<void> => {
    const provider = this.walletConnectStore.getValue().provider;
    this.walletConnectStore.setLoading(true);
    await provider?.disconnect();
    this.walletConnectStore.update({
      provider: null,
      account: "",
      chainId: -1,
    });
    this.walletConnectStore.setLoading(false);
  };

  enableWalletConnect = async (
    provider: WalletConnectProvider
  ): Promise<WalletConnectProvider> => {
    await provider
      ?.enable()
      .catch((error) => this.walletConnectStore.setError(error));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    provider?.connector.on("disconnect", (_error, payload) => {
      this.walletConnectStore.update({
        provider: null,
        account: "",
        chainId: -1,
      });
    });
    provider?.connector.on("session_update", (_error, payload) => {
      const { chainId, accounts } = payload.params[0];
      this.walletConnectStore.update({
        provider: provider,
        account: accounts[0],
        chainId: chainId,
      });
    });
    this.walletConnectStore.update({
      provider: provider,
      account: provider.accounts[0],
      chainId: provider.chainId,
    });
    return provider;
  };
}

export const walletConnectService = new WalletConnectService(
  walletConnectStore
);
