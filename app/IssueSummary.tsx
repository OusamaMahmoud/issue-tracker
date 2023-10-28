import { Status } from "@prisma/client";
import { Flex, Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
interface Props {
  open: number;
  inprogress: number;
  closed: number;
}
const IssueSummary = ({ open, closed, inprogress }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open isssues", value: open, status: "OPEN" },
    { label: "Closed isssues", value: closed, status: "CLOSED" },
    { label: "Inprogress isssues", value: inprogress, status: "INPROGRESS" },
  ];
  return (
    <Flex gap={"3"}>
      {containers.map((container) => (
        <Card key={container.value}>
          <Flex direction={"column"} gap={"3"}>
            <Link
              className="font-medium"
              href={`/issues/list/?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size={"5"} className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
