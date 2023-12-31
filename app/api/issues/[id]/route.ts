import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import AuthOptions from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  // const session = await getServerSession(AuthOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });
  const { assignedToUserId, title, description } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user)
      return NextResponse.json({ error: "User is not found" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue)
    return NextResponse.json({ error: "Issue is not exist" }, { status: 404 });

  const updateIssue = await prisma.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updateIssue);
}
export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(AuthOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: {
      id: parseInt(params.id),
    },
  });
  return NextResponse.json({});
}
