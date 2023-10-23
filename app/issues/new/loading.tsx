import { Box } from "@radix-ui/themes";
import {Skeleton} from "@/app/components";

const loadingNewPageIssue = () => {
  return (
    <Box>
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default loadingNewPageIssue;
