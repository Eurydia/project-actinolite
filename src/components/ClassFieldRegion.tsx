import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";
import { Box, Stack } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { id: string; children?: ReactNode };
export const Sortable: FC<Props> = (props) => {
  const { id, children } = props;
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });
  const style = isDropTarget
    ? { background: "#00000030" }
    : undefined;
  return (
    <Box
      ref={ref}
      sx={{ ...style }}
    >
      <Stack spacing={0.5}>{children}</Stack>
    </Box>
  );
};
