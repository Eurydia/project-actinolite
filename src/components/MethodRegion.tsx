import { useDroppable } from "@dnd-kit/react";
import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { id: string; children?: ReactNode };
export const MethodRegion: FC<Props> = ({
  id,
  children,
}) => {
  const { ref } = useDroppable({
    id,
    type: "method-column",
    accept: ["method"],
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
      {/* <Toolbar
        disableGutters
        variant="dense"
        sx={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <IconButton size="small">
          <AddRounded fontSize="small" />
        </IconButton>
      </Toolbar> */}
      {children}
    </Box>
  );
};
