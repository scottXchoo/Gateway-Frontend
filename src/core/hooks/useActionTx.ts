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
  const [projectReqIds, setProjectReqIds] = useState<number[]>(
    Array(projectList.length + 1).fill(0)
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

      console.log("TxResult", result);

      if (result) {
        const projectInfoResult = await copyClient?.queryContractSmart(
          ContractInfo.contractAddr,
          {
            ProjectInfo: {
              id: projectId,
            },
          }
        );

        console.log(projectInfoResult);

        if (projectInfoResult) {
          const newReqIds = [...projectReqIds];
          // const reqId = projectInfoResult.result[0].req_id;
          // newReqIds[projectId] = reqId;

          // console.log("projectInfoResult", projectInfoResult);
          // console.log("newReqIds", newReqIds);

          // setProjectReqIds(newReqIds);
        } else {
          console.error("Error Query ProjectInfo");
        }

        const resultQuery = await copyClient?.queryContractSmart(
          ContractInfo.contractAddr,
          {
            ResultInfo: {
              id: projectId - 1,
              req_id: 3,
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
    [cwClient, userAddress, actionResults, projectReqIds]
  );

  return { executeAction, actionResults };
};
