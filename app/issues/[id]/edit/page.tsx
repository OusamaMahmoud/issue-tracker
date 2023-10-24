import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const editIssuePage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) return notFound();
  return <IssueForm issue={issue} />;
};

export default editIssuePage;
