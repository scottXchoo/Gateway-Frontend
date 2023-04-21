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
        const resultQuery = await copyClient?.queryContractSmart(
          ContractInfo.contractAddr,
          {
            ResultInfo: {
              id: projectId,
              req_id: projectId,
            },
          }
        );

        if (resultQuery) {
          const newActionResults = [...actionResults];
          const result = resultQuery.result;
          newActionResults[projectId] = result;

          setActionResults(newActionResults);
        } else {
          console.error("Error Query");
        }
      } else {
        console.error("Error Tx");
      }
      return result;
    },
    [cwClient, userAddress, actionResults]
  );

  return { executeAction, actionResults };
};
