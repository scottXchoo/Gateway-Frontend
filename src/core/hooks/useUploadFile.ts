import {
  getClientAtom,
  isModalOpenAtom,
  getProjectIdArrayAtom,
} from "../state/globalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCallback } from "react";
import _ from "lodash";
import { ContractInfo } from "../config/chainInfo";

export const useUploadFile = () => {
  const cwClient = useRecoilValue(getClientAtom);
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const setProjectIdArray = useSetRecoilState(getProjectIdArrayAtom);

  const executeUpload = useCallback(
    async (userAddress: string) => {
      if (!cwClient) return null;
      const copyClient = _.cloneDeep(cwClient);
      const result = await copyClient.execute(
        userAddress,
        ContractInfo.contractAddr,
        {
          CreateProjectMsg: {
            owner: userAddress,
            github_addr:
              "https://github.com/a41ventures/A4asset-client/blob/main/src/core/hooks/useTableData.ts",
            description: "descriptiondsfs",
          },
        },
        "auto"
      );

      if (result.logs[0].events[2].attributes[1].value) {
        const projectId = result.logs[0].events[2].attributes[1].value;
        setIsModalOpen(false);
        setProjectIdArray((prevArray) => [...prevArray, projectId]);
      } else {
        console.error("Error");
      }
      return result;
    },
    [cwClient, setIsModalOpen, setProjectIdArray]
  );

  return { executeUpload };
};
