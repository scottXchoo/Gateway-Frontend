import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ConstantineInfo } from "../config/chainInfo";
import { GasPrice } from "@cosmjs/stargate";

const useUploadFile = async () => {
  const RPC = ConstantineInfo.rpc;
  if (!window.getOfflineSigner || !window.keplr) {
    throw new Error("Please install keplr extension");
  }
  const offlineSigner = await window.getOfflineSigner(ConstantineInfo.chainId);
  const cwClient = await SigningCosmWasmClient.connectWithSigner(
    RPC,
    offlineSigner,
    {
      gasPrice: GasPrice.fromString(
        "0.002" + ConstantineInfo.currencies[0].coinMinimalDenom
      ),
    }
  );
  // const result = await cwClient.execute(
  //   address,

  // )
};

export default useUploadFile;
