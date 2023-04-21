import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Button from "./Button";
import { useRecoilValue } from "recoil";
import { getAddressAtom } from "@/core/state/globalState";
import { useActionTx } from "@/core/hooks/useActionTx";

type ActionProps = {
  projectId: number;
};

const Action = ({ projectId }: ActionProps) => {
  const userAddress = useRecoilValue(getAddressAtom);
  const [inputValues, setInputValues] = useState<string[]>(Array(4).fill(""));
  const [actionStates, setActionStates] = useState<boolean[]>([false]);
  const { executeAction } = useActionTx();

  console.log("inputValues", inputValues);
  console.log("actionStates", actionStates);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleAction = async (id: number) => {
    const newButtonStates = [...actionStates];
    newButtonStates[id] = !newButtonStates[id];
    setActionStates(newButtonStates);

    await executeAction(userAddress, id, inputValues[id]);

    newButtonStates[id] = !newButtonStates[id];
    setActionStates(newButtonStates);
    setInputValues(Array(4).fill(""));
  };

  return (
    <>
      <InputContainer>
        <InputHeader className="text-left">🔎 Action Input</InputHeader>
        <InputBox>
          <Input
            onChange={(e) => handleChange(e, projectId)}
            placeholder="Action this project!"
            value={inputValues[projectId]}
            type="text"
          />
        </InputBox>
        <InputHeader className="text-left">⚡️ Action Output</InputHeader>
        <div className="py-2 text-left">
          <p className="text-xs font-normal"></p>
        </div>
      </InputContainer>

      <Button
        isLoading={actionStates[projectId]}
        hasValue={!!inputValues}
        onClick={() => handleAction(projectId)}
        buttonText="ACTION"
      />
    </>
  );
};

export default Action;

const InputContainer = tw.div`
  border-b border-gray-100 mb-3
`;
const InputBox = tw.div`
  my-2 flex rounded-[5px] shadow-md sm:max-w-md focus:outline-none
`;
const Input = tw.input`
rounded-[5px] ring-1 ring-inset ring-gray-200 flex-auto border-0 py-1.5 pl-2 text-gray-150 placeholder:text-gray-200 focus:ring-0 sm:text-sm sm:leading-6
`;
const InputHeader = tw.div`
  text-md font-semibold leading-7 text-gray-800 mt-3
`;
