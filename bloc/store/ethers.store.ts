import { BehaviorSubject } from "rxjs";
import { Web3Provider } from "@ethersproject/providers";

export type EthersState = { web3Provider?: Web3Provider };

export const initialState: EthersState = { web3Provider: undefined };

export const ethersSubject = new BehaviorSubject(initialState);
