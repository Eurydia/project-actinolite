import { DiagramClassAttribute } from "@/types/figure";
import {
  Box,
  InputAdornment,
  InputBase,
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
          value={primary}
          onTextChange={setPrimary}
        />
        {/* <InputBase
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
        /> */}
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
  }
);
