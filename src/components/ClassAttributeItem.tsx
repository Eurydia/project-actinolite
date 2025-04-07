import { DiagramClassAttribute } from "@/types/figure";
import {
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  data: DiagramClassAttribute;
};
export const ClassAttributeItem: FC<Props> = memo(
  ({ data }) => {
    const [access, setAccess] = useState(data.access_);
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
        paddingX={1}
        sx={{
          cursor: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
        }}
      >
        <InputAdornment position="start">
          <Typography
            fontFamily="monospace"
            fontWeight={900}
            onClick={handleCycleAccess}
            sx={{ cursor: "pointer" }}
          >
            {access}
          </Typography>
        </InputAdornment>
        <StrictTextField
          placeholder="unnamed"
          value={primary}
          onTextChange={setPrimary}
        />
        <Typography paddingX={1}>:</Typography>
        <StrictTextField
          placeholder="untyped"
          value={secondary}
          onTextChange={setSecondary}
        />
      </Box>
    );
  }
);
