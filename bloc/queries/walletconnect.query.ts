import { Query } from "@datorama/akita";
import {
  WalletConnectState,
  walletConnectStore,
  WalletConnectStore,
} from "../store/walletconnect.store";

export class WalletConnectQuery extends Query<WalletConnectState> {
  provider$ = this.select((state) => state.provider);
  isConnected$ = this.select((state) => state.provider?.connected);
  walletData$ = this.select([
    (state) => state.chainId,
    (state) => state.account,
  ]);

  error$ = this.selectError();
  isLoading$ = this.selectLoading();
  constructor(protected store: WalletConnectStore) {
    super(store);
  }
}

export const walletConnectQuery = new WalletConnectQuery(walletConnectStore);
