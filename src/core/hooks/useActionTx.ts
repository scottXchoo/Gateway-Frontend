import { getClientAtom, getAddressAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";
import { ContractInfo } from "../config/chainInfo";
import { useCallback } from "react";
import _ from "lodash";

export const useActionTx = () => {
  const cwClient = useRecoilValue(getClientAtom);
  const userAddress = useRecoilValue(getAddressAtom);

  const executeAction = useCallback(
    async (walletAddress: string, id: number, input: string) => {
      if (!cwClient) return null;
      const copyClient = _.cloneDeep(cwClient);
      const result = await copyClient.execute(
        userAddress,
        ContractInfo.contractAddr,
        {
          ResultRequestMsg: {
            user: walletAddress,
            id: id,
            input: input,
          },
        },
        "auto"
      );
      if (result) {
        console.log(result);
      } else {
        console.error("Error");
      }
      return result;
    },
    [cwClient, userAddress]
  );

  return { executeAction };
};
