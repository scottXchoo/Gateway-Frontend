import { getClientAtom } from "../state/globalState";
import { useRecoilValue } from "recoil";
import { useCallback } from "react";
import _ from "lodash";

export const useUploadFile = () => {
  const userAddress = "archway1dqqfypr9a98czeh23a64eh6a0y7cqhycrzsm6a";
  const contractAddress =
    "archway1nncwqvzr5ep4fmqxn43uh6w9upydvrh5qpsud7nmg0fuwupjm8es8x9afu";
  const cwClient = useRecoilValue(getClientAtom);

  const executeUpload = useCallback(async () => {
    if (!cwClient) return null;
    const copyClient = _.cloneDeep(cwClient);
    const result = await copyClient.execute(
      userAddress,
      contractAddress,
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

    return result;
  }, [cwClient]);

  return { executeUpload };
};
