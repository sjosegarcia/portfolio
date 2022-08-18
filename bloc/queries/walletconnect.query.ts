import { Query } from "@datorama/akita";
import {
  WalletConnectState,
  walletConnectStore,
  WalletConnectStore,
} from "../store/walletconnect.store";

export class WalletConnectQuery extends Query<WalletConnectState> {
  provider$ = this.select((state) => state.provider);
  web3$ = this.select((state) => state.web3);
  error$ = this.selectError();
  isLoading$ = this.selectLoading();
  constructor(protected store: WalletConnectStore) {
    super(store);
  }
}

export const walletConnectQuery = new WalletConnectQuery(walletConnectStore);
