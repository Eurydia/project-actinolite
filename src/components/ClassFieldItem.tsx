import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  id: string;
  index: number;
  children?: ReactNode;
};
export const ClassFieldItem: FC<Props> = (props) => {
  const { id, index, children } = props;
  const { ref, isDragging } = useSortable({ id, index });
  return (
    <Box
      ref={ref}
      sx={{
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        padding: 2,
        backgroundColor: "primary.light",
      }}
    >
      {children}
    </Box>
  );
};
