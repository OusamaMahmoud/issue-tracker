import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "blue" }
> = {
  OPEN: { label: "open", color: "red" },
  CLOSED: { label: "closed", color: "violet" },
  INPROGRESS: { label: "in-progress", color: "blue" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
