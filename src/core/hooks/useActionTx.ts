import { getClientAtom, getAddressAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";
import { ContractInfo } from "../config/chainInfo";
import { useCallback, useState } from "react";
import { ProjectType } from "@/components/common/ProjectCard";
import _ from "lodash";

export const useActionTx = (projectList: ProjectType[]) => {
  const cwClient = useRecoilValue(getClientAtom);
  const userAddress = useRecoilValue(getAddressAtom);
  const [actionResults, setActionResults] = useState<string[]>(
    Array(projectList.length + 1).fill("")
  );

  const executeAction = useCallback(
    async (walletAddress: string, projectId: number, input: string) => {
      if (!cwClient) return null;
      const copyClient = _.cloneDeep(cwClient);
      const result = await copyClient.execute(
        userAddress,
        ContractInfo.contractAddr,
        {
          ResultRequestMsg: {
            user: walletAddress,
            id: projectId,
            input: input,
          },
        },
        "auto"
      );

      if (result) {
        const newActionResults = [...actionResults];
        newActionResults[projectId] =
          "Project Gateway is a groundbreaking solution designed to bridge the gap between Web 2.0 and Web 3.0, built on the Archway platform.";
        setActionResults(newActionResults);
      } else {
        console.error("Error Tx");
      }

      return result;
    },
    [cwClient, userAddress, actionResults]
  );

  return { executeAction, actionResults };
};
