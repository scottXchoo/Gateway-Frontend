import { useCallback, useState } from "react";
import { getClientAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";
import { ContractInfo } from "../config/chainInfo";
import _ from "lodash";
import { ProjectType } from "@/components/common/ProjectCard";

export const useProjectQuery = () => {
  const cwClient = useRecoilValue(getClientAtom);
  const [newProjectInfo, setNewProjectInfo] = useState<ProjectType | null>(
    null
  );

  const queryProject = useCallback(
    async (projectId: number) => {
      if (!cwClient) return null;
      const copyClient = _.cloneDeep(cwClient);
      const result = await copyClient.queryContractSmart(
        ContractInfo.contractAddr,
        {
          ProjectInfo: {
            id: projectId,
          },
        }
      );

      if (result) {
        setNewProjectInfo(
          result.id === 1
            ? null
            : {
                uniqueId: result.id,
                description: result.description,
                address: result.owner,
                githubLink: result.github_addr,
              }
        );
      } else {
        console.error("Error");
      }
      return result;
    },
    [cwClient]
  );

  return { queryProject, newProjectInfo };
};
