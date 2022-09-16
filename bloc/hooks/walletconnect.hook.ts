import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { walletConnectQuery } from "../queries/walletconnect.query";
import { walletConnectService } from "../services/walletconnect.service";
interface WalletConnectHookState {
  provider: WalletConnectProvider | null;
  chainId: number | null;
  account: string | null;
  isLoading: boolean | null;
  isConnected?: boolean | null;
  error: any | null;
}

export const useWalletConnect = (): [
  WalletConnectHookState,
  () => Promise<void>,
  () => Promise<void>,
  boolean
] => {
  const [walletConnect, setWalletConnect] = useState<WalletConnectHookState>({
    provider: null,
    chainId: null,
    account: null,
    isLoading: null,
    isConnected: null,
    error: null,
  });
  const onOpen = walletConnectService.openWalletConnect;
  const onClose = walletConnectService.closeWalletConnect;
  const isLoggedIn =
    walletConnect.provider?.accounts !== undefined &&
    walletConnect.provider?.accounts.length > 0;

  useEffect(() => {
    const subscriptions: Subscription[] = [
      walletConnectQuery.walletData$.subscribe((walletData) =>
        setWalletConnect((state) => ({
          ...state,
          chainId: walletData[0],
          account: walletData[1],
        }))
      ),
      walletConnectQuery.provider$.subscribe((provider) =>
        setWalletConnect((state) => ({ ...state, provider: provider }))
      ),
      walletConnectQuery.isLoading$.subscribe((isLoading) =>
        setWalletConnect((state) => ({ ...state, isLoading: isLoading }))
      ),
      walletConnectQuery.error$.subscribe((error) =>
        setWalletConnect((state) => ({ ...state, error: error }))
      ),
      walletConnectQuery.isConnected$.subscribe((isConnected) =>
        setWalletConnect((state) => ({ ...state, isConnected: isConnected }))
      ),
    ];

    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return [walletConnect, onOpen, onClose, isLoggedIn];
};
