import { getClientAtom, getAddressAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";
import { ContractInfo } from "../config/chainInfo";
import { useCallback, useState } from "react";
import _ from "lodash";
import { ProjectType } from "@/components/common/ProjectCard";

export const useActionTx = (projectList: ProjectType[]) => {
  const cwClient = useRecoilValue(getClientAtom);
  const userAddress = useRecoilValue(getAddressAtom);
  const [actionResults, setActionResults] = useState<string[]>(
    Array(projectList.length + 1).fill("")
  );

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
        const newActionResults = [...actionResults];
        newActionResults[id] = result.logs[0].log;
        setActionResults(newActionResults);
      } else {
        console.error("Error");
      }
      return result;
    },
    [cwClient, userAddress, actionResults]
  );

  return { executeAction, actionResults };
};
