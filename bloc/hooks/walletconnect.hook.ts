import { useEffect, useState } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { walletConnectQuery } from "../queries/walletconnect.query";
import { walletConnectService } from "../services/walletconnect.service";
import { WalletConnectState } from "../store/walletconnect.store";

type WalletConnectHook = {
  state: WalletConnectState;
  onOpen: () => Promise<void>;
  onClose: () => Promise<void>;
  isLoggedIn: boolean;
};

export const useWalletConnect = (): WalletConnectHook => {
  const [state, setState] = useState<WalletConnectState>({
    provider: null,
    error: null,
    isLoading: null,
  });
  const onOpen = walletConnectService.openWalletConnect;
  const onClose = walletConnectService.closeWalletConnect;
  const isLoggedIn =
    state.provider?.accounts !== undefined &&
    state.provider?.accounts.length > 0;

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectQuery.provider$.subscribe((provider) =>
        setState((state) => ({ ...state, provider: provider }))
      ),
      walletConnectQuery.isLoading$.subscribe((isLoading) =>
        setState((state) => ({ ...state, isLoading: isLoading }))
      ),
      walletConnectQuery.error$.subscribe((error) =>
        setState((state) => ({ ...state, error: error }))
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return { state, onOpen, onClose, isLoggedIn };
};
