import { BehaviorSubject } from "rxjs";
import { Web3Provider } from "@ethersproject/providers";

export type EthersState = { provider: Web3Provider | null };

export const initialState: EthersState = { provider: null };

export const ethersSubject = new BehaviorSubject(initialState);
