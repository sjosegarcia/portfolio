import { Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { useImmer } from "use-immer";
import {
  EthersState,
  ethersSubject,
  initialState,
} from "../store/ethers.store";
import { useWalletConnect } from "./walletconnect.hook";

type EthersHook = {
  state: EthersState;
  create: () => void;
};

export const useEthers = (): EthersHook => {
  const walletConnect = useWalletConnect();
  const [state, setState] = useImmer<EthersState>(initialState);

  const createProvider = (provider: WalletConnectProvider | null) => {
    if (provider === null) return;
    ethersSubject.next({ provider: new Web3Provider(provider) });
  };

  const create = () => {
    const walletConnectProvider = walletConnect.state.provider;
    createProvider(walletConnectProvider);
  };

  useEffect(() => {
    const subscriptions: Subscription[] = [
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
  return { state, create };
};
