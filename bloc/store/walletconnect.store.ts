import { BehaviorSubject } from "rxjs";
import WalletConnectProvider from "@walletconnect/web3-provider";

export type WalletConnectState = {
  walletConnectProvider?: WalletConnectProvider;
};

export const initialState: WalletConnectState = {
  walletConnectProvider: undefined,
};

export const walletConnectSubject = new BehaviorSubject(initialState);
