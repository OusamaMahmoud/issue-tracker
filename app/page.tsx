import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueSummary from "./IssueSummary";
import LatestsIssues from "./LatestsIssues";
import IssuesBarchart from "./IssuesBarchart";

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
