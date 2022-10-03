import { BehaviorSubject } from "rxjs";
import WalletConnectProvider from "@walletconnect/web3-provider";

export type WalletConnectState = { provider: WalletConnectProvider | null };

export const initialState: WalletConnectState = { provider: null };

export const walletConnectSubject = new BehaviorSubject(initialState);
