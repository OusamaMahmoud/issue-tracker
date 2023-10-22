import prisma from "@/prisma/client";
import {
  Button,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <>
      <div className="mb-5">
        <Button>
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
      <TableRoot variant="surface">
        <TableHeader>
          <TableColumnHeaderCell>Issues</TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Status
          </TableColumnHeaderCell>
          <TableColumnHeaderCell className="hidden md:table-cell">
            Created
          </TableColumnHeaderCell>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                {issue.title}
                <div className="block md:hidden mt-1">{issue.status}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.status}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </>
  );
};

export default IssuePage;
