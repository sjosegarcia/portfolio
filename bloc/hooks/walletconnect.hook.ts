import { useEffect } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  initialState,
  WalletConnectState,
  walletConnectSubject,
} from "../store/walletconnect.store";
import { useImmer } from "use-immer";

type WalletConnectHook = {
  state: WalletConnectState;
  onDisable: () => void;
  onEnable: () => Promise<void>;
  isLoggedIn: boolean;
};

export const useWalletConnect = (): WalletConnectHook => {
  const [state, setState] = useImmer<WalletConnectState>(initialState);
  const isLoggedIn =
    state.provider?.accounts !== undefined &&
    state.provider?.accounts.length > 0;

  const create = new WalletConnectProvider({
    rpc: { 5: process.env.NEXT_PUBLIC_GOERLI_URL || "" },
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "",
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const onDisable = (): void => {
    walletConnectSubject.next(initialState);
  };

  const onEnable = async (): Promise<void> => {
    const provider = create;
    await provider?.enable().catch();
    provider?.connector.on("disconnect", (_error, payload) => {
      onDisable();
    });

    provider?.connector.on("session_update", (_error, payload) => {
      const { chainId, accounts } = payload.params[0];
      // state = { ...state, chainId: chainId, account: accounts[0] };
    });
    walletConnectSubject.next({ provider: provider });
  };

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectSubject.subscribe((value) =>
        setState((draft) => {
          draft.provider = value.provider;
        })
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return { state, onDisable, onEnable, isLoggedIn };
};
