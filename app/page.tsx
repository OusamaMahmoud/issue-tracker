import prisma from "@/prisma/client";
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

  return <IssuesBarchart open={open} closed={closed} inprogress={inprogress} />;
}
