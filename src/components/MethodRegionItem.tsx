import { DiagramClassMethod } from "@/types/figure";
import {
  Box,
  InputAdornment,
  InputBase,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";

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
      component="li"
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
          {access_}
        </Typography>
      </InputAdornment>
      <InputBase
        value={primary}
        onChange={({ target }) => {
          setPrimary(target.value);
        }}
        placeholder="unnamed"
        multiline
        slotProps={{
          input: {
            sx: {
              "&:focus": {
                textDecorationLine: "underline",
              },
              "fontFamily": "monospace",
              "whiteSpace": "normal",
              "overflowWrap": "break-word",
            },
            autoCorrect: "off",
            spellCheck: "false",
          },
        }}
      />
      <Typography paddingX={1}>:</Typography>
      <InputBase
        value={secondary}
        onChange={({ target }) => {
          setSecondary(target.value);
        }}
        placeholder="untyped"
        multiline
        slotProps={{
          input: {
            sx: {
              "&:focus": {
                textDecorationLine: "underline",
              },
              "fontFamily": "monospace",
              "fontStyle": "italic",
              "whiteSpace": "normal",
              "overflowWrap": "break-word",
            },
            autoCorrect: "off",
            spellCheck: "false",
          },
        }}
      />
    </Box>
  );
});
