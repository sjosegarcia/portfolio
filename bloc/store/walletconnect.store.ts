import { Store, StoreConfig } from "@datorama/akita";
import WalletConnectProvider from "@walletconnect/web3-provider";

export interface WalletConnectState {
  provider: WalletConnectProvider | null;
  chainId: number | null;
  account: string | null;
}

const createInitialState: WalletConnectState = {
  provider: null,
  chainId: null,
  account: null,
};

@StoreConfig({ name: "walletconnect" })
export class WalletConnectStore extends Store<WalletConnectState> {
  constructor() {
    super(createInitialState);
  }
}

export const walletConnectStore = new WalletConnectStore();
