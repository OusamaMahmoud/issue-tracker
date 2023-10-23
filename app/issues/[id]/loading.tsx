import { Box, Flex, Card } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loadingIssueDetailsPage = async () => {
  return (
    <Box>
      <Skeleton className="max-w-xl" />
      <Flex gap={"4"} my={"4"}>
        <Skeleton width={"4rem"}/>
        <Skeleton width={"8rem"} />
      </Flex>
      <Card className="prose">
        <Skeleton height={"20rem"} />
      </Card>
    </Box>
  );
};

export default loadingIssueDetailsPage;
