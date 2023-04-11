import { atom } from "recoil";

export const isConnectWalletAtom = atom<boolean>({
  key: "isConnectWallet",
  default: false,
});

export const isModalOpenAtom = atom<boolean>({
  key: "isModalOpen",
  default: false,
});
