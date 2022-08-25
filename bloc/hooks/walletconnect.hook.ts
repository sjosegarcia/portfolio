import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs/internal/Subscription";
import { walletConnectQuery } from "../queries/walletconnect.query";
import { walletConnectService } from "../services/walletconnect.service";
interface WalletConnectHookState {
  provider: WalletConnectProvider | null;
  web3: providers.Web3Provider | null;
  isLoading: boolean;
  error: any;
}

export const useWalletConnect = (): [
  WalletConnectHookState,
  () => Promise<void>,
  () => Promise<void>,
  boolean
] => {
  const [walletConnect, setWalletConnect] = useState<WalletConnectHookState>({
    provider: null,
    web3: null,
    isLoading: false,
    error: null,
  });
  const open = walletConnectService.openWalletConnect;
  const close = walletConnectService.closeWalletConnect;
  const isLoggedIn =
    walletConnect.provider?.accounts !== undefined &&
    walletConnect.provider?.accounts.length > 0;

  useEffect(() => {
    if (localStorage.getItem("isWalletConnected") === "true") open();
    const subscriptions: Subscription[] = [
      walletConnectQuery.provider$.subscribe((provider) =>
        setWalletConnect((state) => ({ ...state, provider: provider }))
      ),
      walletConnectQuery.web3$.subscribe((web3) =>
        setWalletConnect((state) => ({ ...state, web3: web3 }))
      ),
      walletConnectQuery.isLoading$.subscribe((isLoading) =>
        setWalletConnect((state) => ({ ...state, isLoading: isLoading }))
      ),
      walletConnectQuery.error$.subscribe((error) =>
        setWalletConnect((state) => ({ ...state, error: error }))
      ),
    ];
    return () => {
      subscriptions.map((sub) => sub.unsubscribe());
    };
  }, []);
  return [walletConnect, open, close, isLoggedIn];
};
