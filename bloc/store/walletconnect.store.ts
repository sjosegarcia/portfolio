import { Store, StoreConfig } from "@datorama/akita";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";

export interface WalletConnectState {
  provider: WalletConnectProvider | null;
  web3: providers.Web3Provider | null;
}

const createInitialState: WalletConnectState = {
  provider: null,
  web3: null,
};

@StoreConfig({ name: "walletconnect" })
export class WalletConnectStore extends Store<WalletConnectState> {
  constructor() {
    super(createInitialState);
  }
}

export const walletConnectStore = new WalletConnectStore();
