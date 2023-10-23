import { IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import { Pencil2Icon } from '@radix-ui/react-icons'
interface Props {
  params: { id: string };
}

const IssueDtailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) return notFound();
  return (
    <Grid columns={"2"} gap={"3"}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={"4"} my={"4"}>
          <IssueStatusBadge status={issue.status} />
          <p>{issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDtailsPage;
