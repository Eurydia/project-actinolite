import { DiagramNodeMethodData } from "@/types/figure";
import { SwapVertRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { FC, memo, useCallback, useState } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  dragHandle: string;
  data: DiagramNodeMethodData;
  onChange: (value: DiagramNodeMethodData) => void;
  onContextMenu: (e: React.MouseEvent) => void;
};
export const ClassMethodRegionItem: FC<Props> = memo(
  ({
    data: { access_, id, primary, secondary },
    onChange,
    onContextMenu,
    dragHandle,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseOver = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseOut = useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleAccessChange = useCallback(() => {
      let nextAccess: DiagramNodeMethodData["access_"];
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
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
          paddingLeft: 3,
        }}
        onContextMenu={onContextMenu}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <SwapVertRounded
          color="action"
          className={dragHandle}
          sx={{
            visibility: isHovered ? "visible" : "hidden",
            cursor: "move",
          }}
        />
        <Button
          variant="text"
          onClick={handleAccessChange}
          color="inherit"
        >
          <Typography
            fontWeight={900}
            sx={{ cursor: "pointer" }}
          >
            {access_}
          </Typography>
        </Button>
        <Stack
          direction="row"
          flexGrow={1}
          alignItems="center"
        >
          <StrictTextField
            placeholder="unnamed"
            value={primary}
            onTextChange={handlePrimaryChange}
            sx={{ flexGrow: 1 }}
          />
          <Typography paddingX={1}>:</Typography>
          <StrictTextField
            placeholder="untyped"
            value={secondary}
            onTextChange={handleSecondaryChange}
            sx={{ flexGrow: 1 }}
          />
        </Stack>
      </Box>
    );
  }
);
