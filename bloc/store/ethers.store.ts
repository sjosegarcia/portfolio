import { Web3Provider } from "@ethersproject/providers";
import { createStore } from "./store";

export type EthersState = { web3Provider?: Web3Provider };

export const initialState: EthersState = { web3Provider: undefined };

export const ethersStore = createStore(initialState, {
  update: (state, newState: EthersState) => newState,
});
