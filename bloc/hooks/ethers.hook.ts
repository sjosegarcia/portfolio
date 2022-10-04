import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { useImmer } from "use-immer";
import {
  EthersState,
  ethersSubject,
  initialState,
} from "../store/ethers.store";
import { walletConnectSubject } from "../store/walletconnect.store";

type EthersHook = {
  state: EthersState;
};

export const useEthers = (): EthersHook => {
  const [state, setState] = useImmer<EthersState>(initialState);

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectSubject.subscribe((state) => {
        const newProvider = state.walletConnectProvider
          ? new Web3Provider(state.walletConnectProvider)
          : undefined;
        ethersSubject.next({
          web3Provider: newProvider,
        });
      }),
      ethersSubject.subscribe((state) =>
        setState((draft) => {
          console.log(state.web3Provider);
          draft.web3Provider = state.web3Provider;
        })
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return { state };
};
