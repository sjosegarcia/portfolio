import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { walletConnectQuery } from "../queries/walletconnect.query";
import { walletConnectService } from "../services/walletconnect.service";

interface WalletConnectHookState {
  provider: WalletConnectProvider | null;
  isLoading: boolean;
  error: any;
}

export const useWalletConnect = (): [
  WalletConnectProvider | null,
  () => Promise<void>,
  () => Promise<void>
] => {
  const [walletConnect, setWalletConnect] = useState<WalletConnectHookState>({
    provider: null,
    isLoading: false,
    error: null,
  });
  const openWalletConnect = walletConnectService.openWalletConnect;
  const disconnect = walletConnectService.closeWalletConnect;

  useEffect(() => {
    const subscriptions: Subscription[] = [
      /*walletConnectQuery.provider$.subscribe((provider) =>
        setWalletConnect((state) => ({ ...state, provider: provider }))
      ),
      walletConnectQuery.isLoading$.subscribe((isLoading) =>
        setWalletConnect((state) => ({ ...state, isLoading: isLoading }))
      ),
      walletConnectQuery.error$.subscribe((error) =>
        setWalletConnect((state) => ({ ...state, error: error }))
      ),*/
    ];
    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return [walletConnect.provider, openWalletConnect, disconnect];
};
