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
  data: { id, access_, primary, secondary },
  onChange,
}) => {
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
      id,
      access_: nextAccess,
      secondary,
      primary,
    });
  }, [access_, id, onChange, primary, secondary]);

  const handlePrimaryChange = useCallback(
    (value: string) => {
      onChange({
        id,
        access_,
        secondary,
        primary: value,
      });
    },
    [access_, id, onChange, secondary]
  );

  const handleSecondaryChange = useCallback(
    (value: string) => {
      onChange({
        id,
        access_,
        primary,
        secondary: value,
      });
    },
    [access_, id, onChange, primary]
  );

  return (
    <Box
      component="li"
      paddingX={1}
      sx={{
        cursor: "auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,

        listStyle: "none",
        height: 50,
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
