import React from "react";
import ComponentLayout from "./ComponentLayout";
import Link from "next/link";
import Image from "next/image";
import { ButtonLayout } from "@/components/common/Button";

const Header = () => {
  return (
    <ComponentLayout>
      <div className="p-5 flex justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/gateway_logo.png" alt="LOGO" width={50} height={50} />
          <p className="text-white font-bold text-2xl ml-2">GATEWAY</p>
        </Link>

        <div className="flex items-center">
          <ButtonLayout className="mr-3">
            <p className="text-white">UPLOAD FILES</p>
          </ButtonLayout>
          <ButtonLayout>
            <p className="text-white">CONNECT WALLET</p>
          </ButtonLayout>
        </div>
      </div>
    </ComponentLayout>
  );
};

export default Header;
