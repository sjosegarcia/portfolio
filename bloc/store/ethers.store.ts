import { BehaviorSubject, Observable } from "rxjs";
import { Web3Provider } from "@ethersproject/providers";

export type EthersState = { web3Provider?: Web3Provider };

export const initialState: EthersState = { web3Provider: undefined };

type Ethers = {
  ethers$: Observable<EthersState>;
  readonly get: EthersState;
  update: (state: EthersState) => void;
};

const EthersStore = (): Ethers => {
  const ethersSubject = new BehaviorSubject(initialState);
  return {
    ethers$: ethersSubject.asObservable(),
    get get() {
      return ethersSubject.getValue();
    },
    update: (state: EthersState) => ethersSubject.next(state),
  };
};

export const ethersStore = EthersStore();
