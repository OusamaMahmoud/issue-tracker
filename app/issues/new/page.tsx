'use client'
import { TextArea, TextField, TextFieldRoot } from "@radix-ui/themes";
import React from "react";

const NewPageIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextFieldRoot>
      <TextField.Input placeholder="title" />
      </TextFieldRoot>
        <TextArea placeholder="Description"/>
    </div>
  );
};

export default NewPageIssue;
