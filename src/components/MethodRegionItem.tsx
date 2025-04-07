import { DiagramClassMethod } from "@/types/figure";
import {
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  data: DiagramClassMethod;
};
export const MethodItem: FC<Props> = memo(({ data }) => {
  const [access_, setAccess] = useState(data.access_);
  const [primary, setPrimary] = useState(data.primary);
  const [secondary, setSecondary] = useState(
    data.secondary
  );
  const handleCycleAccess = useCallback(() => {
    setAccess((prev) => {
      switch (prev) {
        case "#":
          return "-";
        case "-":
          return "+";
        default:
          return "#";
      }
    });
  }, []);

  return (
    <Box
      sx={{
        cursor: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
        width: "100%",
      }}
    >
      <InputAdornment position="start">
        <Typography
          fontFamily="monospace"
          fontWeight={900}
          onClick={handleCycleAccess}
          sx={{ cursor: "pointer" }}
        >
          {access_}
        </Typography>
      </InputAdornment>
      <StrictTextField
        value={primary}
        placeholder="unnamed"
        onTextChange={setPrimary}
      />
      <Typography paddingX={1}>:</Typography>
      <StrictTextField
        value={secondary}
        placeholder="untyped"
        onTextChange={setSecondary}
      />
    </Box>
  );
});
