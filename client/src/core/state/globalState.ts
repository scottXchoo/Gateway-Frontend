import { atom } from "recoil";

export const isConnectWalletAtom = atom<boolean>({
  key: "isConnectWallet",
  default: false,
});
