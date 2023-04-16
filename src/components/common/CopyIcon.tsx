import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

type CopyIconProps = {
  text: string;
};

const CopyIcon = ({ text }: CopyIconProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button onClick={handleClick}>
      {isCopied ? (
        <p className="text-green-500 text-xs font-bold">Copied</p>
      ) : (
        <Image alt="copy" src="/copy.svg" width={20} height={20} />
      )}
    </button>
  );
};

export default CopyIcon;
