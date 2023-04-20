import {
  getClientAtom,
  isModalOpenAtom,
  getProjectIdArrayAtom,
  getAddressAtom,
} from "../state/globalState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ContractInfo } from "../config/chainInfo";
import { useCallback } from "react";
import _ from "lodash";

export const useUploadFile = () => {
  const cwClient = useRecoilValue(getClientAtom);
  const userAddress = useRecoilValue(getAddressAtom);
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const setProjectIdArray = useSetRecoilState(getProjectIdArrayAtom);

  const executeUpload = useCallback(
    async (description: string, walletAddress: string, githubAddr: string) => {
      if (!cwClient) return null;
      const copyClient = _.cloneDeep(cwClient);
      const result = await copyClient.execute(
        userAddress,
        ContractInfo.contractAddr,
        {
          CreateProjectMsg: {
            owner: walletAddress,
            github_addr: githubAddr,
            description: description,
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
    [cwClient, userAddress, setIsModalOpen, setProjectIdArray]
  );

  return { executeUpload };
};
