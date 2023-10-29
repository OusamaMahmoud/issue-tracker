import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestsIssues from "./LatestsIssues";
import IssuesBarchart from "./IssuesBarchart";
import type { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inprogress = await prisma.issue.count({
    where: {
      status: "INPROGRESS",
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Flex direction={"column"} gap={"5"}>
        <IssueSummary open={open} closed={closed} inprogress={inprogress} />
        <IssuesBarchart open={open} closed={closed} inprogress={inprogress} />
      </Flex>
      <LatestsIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Isssue Tracker - Dashboard",
  description:
    "At first glance, the Dashboard presents a summarized view of the most critical data. It includes the total number of open issues, resolved issues, pending tasks, and any overdue assignments. This snapshot allows you to grasp the current state of your project instantly.",
};
