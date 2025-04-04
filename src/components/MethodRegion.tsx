import { CollisionPriority } from "@dnd-kit/abstract";
import { pointerDistance } from "@dnd-kit/collision";
import { useDroppable } from "@dnd-kit/react";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { id: string; children?: ReactNode };
export const MethodRegion: FC<Props> = ({
  id,
  children,
}) => {
  const { ref, isDropTarget } = useDroppable({
    id,
    accept: "method",
    collisionPriority: CollisionPriority.High,
    collisionDetector: pointerDistance,
  });

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minHeight: 50,
        borderWidth: 4,
        borderStyle: isDropTarget ? "dashed" : undefined,
      }}
    >
      {children}
    </Box>
  );
};
