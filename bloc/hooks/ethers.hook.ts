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
        const newProvider =
          state.provider !== null ? new Web3Provider(state.provider) : null;
        ethersSubject.next({
          provider: newProvider,
        });
      }),
      ethersSubject.subscribe((state) =>
        setState((draft) => {
          draft.provider = state.provider;
        })
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return { state };
};
