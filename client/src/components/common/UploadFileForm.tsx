import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import tw from "tailwind-styled-components";

export interface FormData {
  title: string;
  githubLink: string;
  walletAddress: string;
  description: string;
}

type UploadFileFormProps = {
  onSave: (values: any) => void;
  user?: any;
};

const schema = z.object({
  title: z.string().min(3).nonempty(),
  githubLink: z.string().url().nonempty(),
  walletAddress: z.string().nonempty(),
  description: z.string().nonempty(),
});

const UploadFileForm = ({ onSave, user = {} }: UploadFileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    resolver: zodResolver(schema),
  });

  const handleSave = (formValues: FormData) => {
    onSave(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="text-left">
        <div className="border-b border-gray-200/10 mb-3">
          <h2 className=" text-lg font-semibold leading-7 text-gray-200 ">
            🌟 Title
          </h2>
          <div className="my-2 flex rounded-[5px] shadow-lg sm:max-w-md focus:outline-none">
            <input
              placeholder="Write your title here"
              className=" rounded-[5px] ring-1 ring-inset ring-gray-50/30 flex-auto border-0 py-1.5 pl-2 text-gray-150 placeholder:text-gray-50/30 focus:ring-0 sm:text-sm sm:leading-6"
              {...register("title", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
            />
          </div>
          {errors.title && (
            <ErrorMessage>
              <span className="font-semibold">Oh, snap!</span> Error Message
            </ErrorMessage>
          )}
        </div>
        <div>
          <p>📝 Description</p>
          <input
            {...register("description", {
              required: true,
              minLength: {
                value: 4,
                message: "Description must be at least 4 characters",
              },
            })}
          />
          {errors.description && "Error"}
        </div>
        <div>
          <p>🚀 Wallet Address</p>
          <input
            {...register("walletAddress", {
              required: true,
              pattern: {
                value: /^0x[a-fA-F0-9]{40}$/,
                message: "Wallet Address is invalid",
              },
            })}
          />
          {errors.walletAddress && "Error"}
        </div>
        <div>
          <p>😺 Github Link</p>
          <input
            {...register("githubLink", {
              required: true,
              pattern: {
                value: /^https?:\/\/github.com\/.+\/.+\/?$/,
                message: "Github Link is invalid",
              },
            })}
          />
          {errors.githubLink && "Error"}
        </div>
        <div>
          <button type="submit">SUBMIT</button>
        </div>
      </div>
    </form>
  );
};

export default UploadFileForm;

const ErrorMessage = tw.p`
  text-red-600
  text-sm
  mb-2
`;
