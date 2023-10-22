'use client'
import { Button, TextArea, TextField, TextFieldRoot } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewPageIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextFieldRoot>
      <TextField.Input placeholder="title" />
      </TextFieldRoot>
      <SimpleMDE placeholder="Description"/>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewPageIssue;
