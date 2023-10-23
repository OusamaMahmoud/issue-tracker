import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loadingNewPageIssue = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default loadingNewPageIssue;
