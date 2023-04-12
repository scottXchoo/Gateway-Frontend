import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
      <div>
        <p>🌟 Title</p>
        <input
          {...register("title", {
            required: true,
            minLength: {
              value: 3,
              message: "Title must be at least 3 characters",
            },
          })}
        />
        {errors.title && "Error"}
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
    </form>
  );
};

export default UploadFileForm;
