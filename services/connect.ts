import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  infuraId: process.env.PRODUCTION
    ? process.env.INFURA_ID
    : "27e484dcd9e3efcfd25a83a78777cdf1",
});

export default provider;
