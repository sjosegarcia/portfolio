import WalletConnectProvider from "@walletconnect/web3-provider";

const provider = new WalletConnectProvider({
  infuraId: process.env.INFURA_ID,
});

export default provider;
