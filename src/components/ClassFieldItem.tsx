import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  id: string;
  index: number;
  group: string;
  children?: ReactNode;
};
export const ClassFieldItem: FC<Props> = (props) => {
  const { group, id, index, children } = props;
  const { ref } = useSortable({
    id,
    index,
    group,
    type: "attr",
    accept: ["attr"],
  });

  return (
    <Box
      ref={ref}
      sx={{ cursor: "grab", width: "fit-content" }}
    >
      {children}
    </Box>
  );
};
