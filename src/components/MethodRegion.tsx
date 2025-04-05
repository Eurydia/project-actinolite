import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = { children?: ReactNode };
export const MethodRegion: FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minHeight: 50,
        borderWidth: 4,
      }}
    >
      {children}
    </Box>
  );
};
