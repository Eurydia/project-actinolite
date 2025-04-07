import { DiagramClassAttribute } from "@/types/figure";
import {
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  data: DiagramClassAttribute;
  onChange: (value: DiagramClassAttribute) => void;
};
export const ClassAttributeRegionItem: FC<Props> = ({
  data,
  onChange,
}) => {
  const { access_, primary, secondary } = data;

  const handleAccessChange = useCallback(() => {
    let nextAccess: DiagramClassAttribute["access_"];
    switch (access_) {
      case "#":
        nextAccess = "-";
        break;
      case "-":
        nextAccess = "+";
        break;
      default:
        nextAccess = "#";
    }
    onChange({
      access_: nextAccess,
      secondary: secondary,
      primary: primary,
    });
  }, [access_, primary, secondary, onChange]);

  const handlePrimaryChange = useCallback(
    (value: string) => {
      onChange({
        access_: access_,
        secondary: secondary,
        primary: value,
      });
    },
    [access_, secondary, onChange]
  );

  const handleSecondaryChange = useCallback(
    (value: string) => {
      onChange({
        access_: access_,
        primary: primary,
        secondary: value,
      });
    },
    [access_, primary, onChange]
  );

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
          onClick={handleAccessChange}
          sx={{ cursor: "pointer" }}
        >
          {access_}
        </Typography>
      </InputAdornment>
      <StrictTextField
        placeholder="unnamed"
        value={primary}
        onTextChange={handlePrimaryChange}
      />
      <Typography paddingX={1}>:</Typography>
      <StrictTextField
        placeholder="untyped"
        value={secondary}
        onTextChange={handleSecondaryChange}
      />
    </Box>
  );
};
