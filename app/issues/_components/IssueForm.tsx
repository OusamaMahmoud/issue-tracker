"use client";
import {
  Button,
  Callout,
  TextField,
  TextFieldRoot,
} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "../../validationSchemas";
import z from "zod";
import { ErrorMessage , Spinner } from "@/app/components";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type FormIssueData = z.infer<typeof issueSchema>;

const IssueForm = ({issue}:{issue?:Issue}) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormIssueData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const submit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if(issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      }else{
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (err) {
      setSubmitting(false);
      setError("please set the fields properly");
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={submit}>
        <TextFieldRoot>
          <TextField.Input defaultValue={issue?.title} placeholder="title" {...register("title")} />
        </TextFieldRoot>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit New Issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
