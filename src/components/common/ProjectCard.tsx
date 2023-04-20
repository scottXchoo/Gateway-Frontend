import Image from "next/image";
import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import { sliceAddress } from "@/core/utils/numerFormatter";
import CopyIcon from "./CopyIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import { useProjectQuery } from "@/core/hooks/useProjectQuery";
import { getAddressAtom, getProjectIdAtom } from "@/core/state/globalState";
import { useActionTx } from "@/core/hooks/useActionTx";
import {
  TransactionStatus,
  TransactionType,
  transactionStatusAtom,
} from "@/core/state/transactionState";

export type ProjectType = {
  uniqueId: number;
  description: string;
  address: string;
  githubLink: string;
};

const projectList: ProjectType[] = [
  {
    uniqueId: 22,
    description: "description",
    address: "0x6C806420091bE7DED3f311FA303Cc7d6B2015113",
    githubLink: "https://github.com/D3LAB-DAO",
  },
  {
    uniqueId: 23,
    description: "description",
    address: "0x6C806420091bE7DED3f311FA303Cc7d6B2015113",
    githubLink: "https://github.com/D3LAB-DAO",
  },
  {
    uniqueId: 24,
    description: "description",
    address: "0x6C806420091bE7DED3f311FA303Cc7d6B2015113",
    githubLink: "https://github.com/D3LAB-DAO",
  },
];

function removeDuplicateArray(arr: ProjectType[], key: string) {
  return arr.filter(
    (item: any, index, self) =>
      index === self.findIndex((t: any) => t[key] === item[key])
  );
}

const ProjectCard = () => {
  const errorState = false;
  const projectId = useRecoilValue(getProjectIdAtom);
  const userAddress = useRecoilValue(getAddressAtom);
  const [transactionStatus, setStatus] = useRecoilState(transactionStatusAtom);
  const { queryProject, newProjectInfo } = useProjectQuery();
  const [input, setInput] = useState("");

  useEffect(() => {
    queryProject(projectId);
  }, [projectId]);

  if (newProjectInfo) projectList.push(newProjectInfo);

  const filterdProjectList = removeDuplicateArray(projectList, "uniqueId");

  const { executeAction } = useActionTx();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleAction = async (id: number) => {
    setStatus({
      status: TransactionStatus.EXECUTING,
      type: TransactionType.ACTION,
    });

    const result = await executeAction(userAddress, id, input);

    if (!result) {
      setStatus({
        status: TransactionStatus.FAILED,
        type: TransactionType.ACTION,
      });
      return;
    }

    setStatus({
      status: TransactionStatus.IDLE,
      type: TransactionType.ACTION,
    });

    setInput("");
  };

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {filterdProjectList.map((item) => (
        <li
          key={`${item.uniqueId}/${item.address}}`}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-2xl bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-4">
            <Image
              className="mx-auto flex-shrink-0 rounded-full"
              src={`/tiny_cute_3d_car(${(item.uniqueId % 4) + 1}).png`}
              width={250}
              height={250}
              alt="projects"
            />
            <InputHeader>#{item.uniqueId}. Project</InputHeader>
            <p className="text-sm text-gray-500">{item.description}</p>

            <div className="rounded-2xl bg-gray-900 text-center shadow px-6 mt-3">
              <InputHeader className="text-left text-white">
                🚀 Wallet Address
                <p className="text-xs font-normal">
                  {sliceAddress(item.address, 8)}{" "}
                  <CopyIcon text={item.address} />
                </p>
              </InputHeader>
              <InputHeader className="text-left text-white mb-6 mt-4">
                😺 Github Link
                <p className="text-xs font-normal">
                  {item.githubLink} <CopyIcon text={item.githubLink} />
                </p>
              </InputHeader>
            </div>
            <InputContainer>
              <InputHeader className="text-left">🔎 Action Input</InputHeader>
              <InputBox>
                <Input
                  onChange={handleChange}
                  placeholder="Action this project!"
                  type="text"
                />
              </InputBox>
              <div className="flex font-bold ">
                {transactionStatus.status === "EXECUTING" ? (
                  <WaitMessage>Wait a minute!</WaitMessage>
                ) : transactionStatus.status === "FAILED" ? (
                  <ErrorMessage>Error!</ErrorMessage>
                ) : null}
              </div>
            </InputContainer>
            <div className="text-right">
              <SubmitButton
                onClick={() => handleAction(item.uniqueId)}
                type="submit"
                className={`${
                  errorState &&
                  "bg-gray-200 hover:bg-gray-200 cursor-not-allowed"
                }}`}
              >
                ACTION
              </SubmitButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProjectCard;

const SubmitButton = tw.button`
  cursor-pointer
  text-white
  font-bold
  py-2
  px-4
  rounded-[5px]
  bg-orange-500
  hover:bg-orange-600
`;
const InputContainer = tw.div`
  border-b border-gray-100 mb-3
`;
const InputHeader = tw.div`
  text-md font-semibold leading-7 text-gray-800 mt-3
`;
const InputBox = tw.div`
  my-2 flex rounded-[5px] shadow-md sm:max-w-md focus:outline-none
`;
const Input = tw.input`
rounded-[5px] ring-1 ring-inset ring-gray-200 flex-auto border-0 py-1.5 pl-2 text-gray-150 placeholder:text-gray-200 focus:ring-0 sm:text-sm sm:leading-6
`;
const ErrorMessage = tw.p`
  text-right
  text-red-600
  text-sm
  mb-2
  font-bold
`;
const WaitMessage = tw.p`
  text-right
  text-blue-600
  text-sm
  mb-2
  font-bold
`;
