import { Query } from "@datorama/akita";
import {
  WalletConnectState,
  walletConnectStore,
  WalletConnectStore,
} from "../store/walletconnect.store";

export class WalletConnectQuery extends Query<WalletConnectState> {
  provider$ = this.select((state) => state.provider);
  web3$ = this.select((state) => state.web3);
  accounts$ = this.select((state) => {
    let newAccounts: string[] = [];
    state.web3?.on(
      "accountsChanged",
      (accounts: string[]) => (newAccounts = accounts)
    );
    return newAccounts;
  });

  chain$ = this.select((state) => {
    let newChainId = -1;
    state.web3?.on("chainChanged", (chainId: number) => (newChainId = chainId));
    return newChainId;
  });

  error$ = this.selectError();
  isLoading$ = this.selectLoading();
  constructor(protected store: WalletConnectStore) {
    super(store);
  }
}

export const walletConnectQuery = new WalletConnectQuery(walletConnectStore);
