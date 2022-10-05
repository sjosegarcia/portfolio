import WalletConnectProvider from "@walletconnect/web3-provider";
import { createStore } from "./store";

export type WalletConnectState = {
  walletConnectProvider?: WalletConnectProvider;
};

export const initialState: WalletConnectState = {
  walletConnectProvider: undefined,
};

export const walletConnectStore = createStore(initialState, {
  update: (state, newState: WalletConnectState) => newState,
});
