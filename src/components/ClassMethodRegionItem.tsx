import { DiagramClassMethod } from "@/types/figure";
import {
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  data: DiagramClassMethod;
  onChange: (value: DiagramClassMethod) => void;
};
export const ClassMethodRegionItem: FC<Props> = memo(
  ({
    data: { access_, id, primary, secondary },
    onChange,
  }) => {
    const handleAccessChange = useCallback(() => {
      let nextAccess: DiagramClassMethod["access_"];
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
        sx={{
          cursor: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          width: "100%",
          listStyle: "none",
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
          value={primary}
          placeholder="unnamed"
          onTextChange={handlePrimaryChange}
        />
        <Typography paddingX={1}>:</Typography>
        <StrictTextField
          value={secondary}
          placeholder="untyped"
          onTextChange={handleSecondaryChange}
        />
      </Box>
    );
  }
);
