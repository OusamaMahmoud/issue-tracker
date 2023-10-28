import React from "react";
import { Link, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Issue, Status } from "@prisma/client";
import { IssueStatusBadge } from "@/app/components";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.value} className={col.className}>
              <NextLink
                href={{
                  query: { ...searchParams, orderBy: col.value },
                }}
              >
                {col.label}
              </NextLink>
              {col.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

interface Column {
    label: string;
    value: keyof Issue;
    className?: string;
  }
  const columns: Column[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];
  
  export const columnNames = columns.map(col => col.value);
  
  export interface IssueQuery {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  }
export default IssueTable;
