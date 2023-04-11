import React, { useState } from "react";
import ComponentLayout from "./ComponentLayout";
import Link from "next/link";
import Image from "next/image";
import { ButtonLayout } from "@/components/common/Button";
import { sliceAddress } from "@/core/utils/numerFormatter";
import { useRecoilState } from "recoil";
import { isConnectWalletAtom } from "@/core/state/globalState";

const Header = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnectWallet, setConnectWallet] =
    useRecoilState(isConnectWalletAtom);

  const handleConnectWallet = async () => {
    const { keplr } = window;
    if (!keplr) {
      alert("Please install keplr extension");
      return;
    }

    const chainId = "cosmoshub-4";
    await keplr.enable(chainId);

    const offlineSigner = keplr.getOfflineSigner(chainId);
    const accounts = await offlineSigner.getAccounts();

    setAddress(accounts[0].address);
    setConnectWallet(true);
  };

  return (
    <ComponentLayout>
      <div className="p-5 flex justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/gateway_logo.png" alt="LOGO" width={50} height={50} />
          <p className="text-white font-bold text-2xl ml-2">GATEWAY</p>
        </Link>

        <div className="flex items-center">
          {isConnectWallet && !!address ? (
            <>
              <ButtonLayout className="mr-5">
                <p className="text-white">UPLOAD FILES</p>
              </ButtonLayout>
              <div className="text-white">
                <b>ADDRESS</b>
                <p className="text-sm">: {sliceAddress(address, 6)}</p>
              </div>
            </>
          ) : (
            <ButtonLayout onClick={handleConnectWallet}>
              <p className="text-white">CONNECT WALLET</p>
            </ButtonLayout>
          )}
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Header;
