"use client";
import { Button, Callout, Text, TextField, TextFieldRoot } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { creteIssueSchema } from "../../validationSchemas";
import z from "zod";

type FormIssue = z.infer<typeof creteIssueSchema>;
const NewPageIssue = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormIssue>({
    resolver: zodResolver(creteIssueSchema),
  });
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text color="red">{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (err) {
            setError("please set the fields properly");
          }
        })}
      >
        <TextFieldRoot>
          <TextField.Input placeholder="title" {...register("title")} />
        </TextFieldRoot>
        {errors.title && <Text color="red" as="p">{errors.title?.message}</Text>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && <Text color="red" as="p">{errors.description?.message}</Text>}
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewPageIssue;
