import { Store, StoreConfig } from "@datorama/akita";
import WalletConnectProvider from "@walletconnect/web3-provider";

export type WalletConnectState = {
  provider: WalletConnectProvider | null;
  error: any | null;
  isLoading: boolean | null;
};

const createInitialState: WalletConnectState = {
  provider: null,
  error: null,
  isLoading: null,
};

@StoreConfig({ name: "walletconnect" })
export class WalletConnectStore extends Store<WalletConnectState> {
  constructor() {
    super(createInitialState);
  }
}

export const walletConnectStore = new WalletConnectStore();
