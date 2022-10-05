import { BehaviorSubject, Observable } from "rxjs";
import WalletConnectProvider from "@walletconnect/web3-provider";

export type WalletConnectState = {
  walletConnectProvider?: WalletConnectProvider;
};

export const initialState: WalletConnectState = {
  walletConnectProvider: undefined,
};
type WalletConnect = {
  walletConnect$: Observable<WalletConnectState>;
  readonly get: WalletConnectState;
  update: (state: WalletConnectState) => void;
};

const WalletConnectStore = (): WalletConnect => {
  const walletConnectSubject = new BehaviorSubject(initialState);
  return {
    walletConnect$: walletConnectSubject.asObservable(),
    get get() {
      return walletConnectSubject.getValue();
    },
    update: (state: WalletConnectState) => walletConnectSubject.next(state),
  };
};

export const walletConnectStore = WalletConnectStore();
