import { CollisionPriority } from "@dnd-kit/abstract";
import { pointerDistance } from "@dnd-kit/collision";
import { useDroppable } from "@dnd-kit/react";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { id: string; children?: ReactNode };
export const ClassAttributeRegion: FC<Props> = (props) => {
  const { id, children } = props;
  const { ref, isDropTarget } = useDroppable({
    id,
    accept: "attr",
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
        borderStyle: isDropTarget ? "dashed" : undefined,
        borderWidth: 4,
      }}
    >
      {children}
    </Box>
  );
};
