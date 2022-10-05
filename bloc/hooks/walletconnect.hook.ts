import { useEffect } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  initialState,
  WalletConnectState,
  walletConnectStore,
} from "../store/walletconnect.store";
import { useImmer } from "use-immer";

type WalletConnectHook = {
  state: WalletConnectState;
  onDisable: () => Promise<void>;
  onEnable: () => Promise<void>;
  isLoggedIn: boolean;
};

export const useWalletConnect = (): WalletConnectHook => {
  const [state, setState] = useImmer<WalletConnectState>(initialState);
  const isLoggedIn =
    state.walletConnectProvider?.accounts !== undefined &&
    state.walletConnectProvider?.accounts.length > 0;

  const sendInitialState = () => walletConnectStore.update(initialState);

  const onDisable = async (): Promise<void> => {
    await state.walletConnectProvider?.disconnect();
    sendInitialState();
  };

  const setUpWalletConnectProvider = (
    walletConnectProvider?: WalletConnectProvider
  ) => {
    const validProvider = (val: any): val is WalletConnectProvider => val;
    if (validProvider(walletConnectProvider)) {
      walletConnectProvider.connector.on("disconnect", (_error, payload) => {
        sendInitialState();
      });

      walletConnectProvider.connector.on(
        "session_update",
        (_error, payload) => {
          const { chainId, accounts } = payload.params[0];
          // state = { ...state, chainId: chainId, account: accounts[0] };
        }
      );
    }
    walletConnectStore.update({ walletConnectProvider: walletConnectProvider });
  };

  const onEnable = async (): Promise<void> => {
    const walletConnectProvider = new WalletConnectProvider({
      rpc: { 5: process.env.NEXT_PUBLIC_GOERLI_URL || "" },
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID || "",
      bridge: "https://bridge.walletconnect.org",
      qrcode: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await walletConnectProvider?.enable().catch((_error) => {
      sendInitialState();
    });
    setUpWalletConnectProvider(walletConnectProvider);
  };

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectStore.walletConnect$.subscribe((state) =>
        setState((draft) => {
          draft.walletConnectProvider = state.walletConnectProvider;
        })
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return { state, onDisable, onEnable, isLoggedIn };
};
