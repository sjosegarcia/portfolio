import { Web3Provider } from "@ethersproject/providers";
import { useEffect } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { useImmer } from "use-immer";
import { EthersState, ethersStore, initialState } from "../store/ethers.store";
import {
  WalletConnectState,
  walletConnectStore,
} from "../store/walletconnect.store";

type EthersHook = {
  state: EthersState;
};

export const useEthers = (): EthersHook => {
  const [state, setState] = useImmer<EthersState>(initialState);

  const setWeb3ProviderState = (state: WalletConnectState) => {
    const newProvider = state.walletConnectProvider
      ? new Web3Provider(state.walletConnectProvider)
      : undefined;
    ethersStore.update({
      web3Provider: newProvider,
    });
  };

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectStore.walletConnect$.subscribe((state) =>
        setWeb3ProviderState(state)
      ),
      ethersStore.ethers$.subscribe((state) =>
        setState((draft) => {
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
