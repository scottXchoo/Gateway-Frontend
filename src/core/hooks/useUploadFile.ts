import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { ConstantineInfo } from "../config/chainInfo";
import { GasPrice } from "@cosmjs/stargate";
import { getAddressAtom, getClientAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";

const useUploadFile = async () => {
  const RPC = ConstantineInfo.rpc;
  const address = useRecoilValue(getAddressAtom);
  const cwClient = useRecoilValue(getClientAtom);
  if (!cwClient) return null;

  // const result = await cwClient.execute(address, {});
};

export default useUploadFile;
