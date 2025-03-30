import { closestCenter } from "@dnd-kit/collision";
import { useDroppable } from "@dnd-kit/react";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { id: string; children?: ReactNode };
export const Sortable: FC<Props> = (props) => {
  const { id, children } = props;
  const { ref } = useDroppable({
    id,
    collisionDetector: closestCenter,
    // collisionPriority: CollisionPriority.Low,
    // collisionDetector: shapeIntersection,
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
      }}
    >
      {children}
    </Box>
  );
};
