import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const creteIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});
export async function POST(requst: NextRequest) {
  const body = await requst.json();
  const validation = creteIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
