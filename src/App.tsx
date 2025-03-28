import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";
import { FC, ReactNode, useState } from "react";

export const App = () => {
  const [items] = useState([1, 2, 3]);
  return <DragDropProvider></DragDropProvider>;
};

const Draggable: FC<{
  id: string;
  index: number;
  children?: ReactNode;
}> = (props) => {
  const { children, id, index } = props;
  const { ref } = useSortable({ id, index });

  return <Box ref={ref}>{children}</Box>;
};

