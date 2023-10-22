"use client";
import { Button, Callout, TextField, TextFieldRoot } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormIssue {
  title: string;
  description: string;
}

const NewPageIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<FormIssue>();
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Text>{error}</Callout.Text>
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewPageIssue;
