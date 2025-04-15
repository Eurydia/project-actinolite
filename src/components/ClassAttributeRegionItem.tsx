import { useContextMenu } from "@/hooks/useContextMenu";
import { DiagramClassAttribute } from "@/types/figure";
import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import { FC, useCallback } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  classId: string;
  id: number;
  data: DiagramClassAttribute["data"];
  handlers: DiagramClassAttribute["handlers"];
};
export const ClassAttributeRegionItem: FC<Props> = ({
  data: { access_, primary, secondary },
  handlers: {
    onAccessChange,
    onDelete,
    onDuplicate,
    onPrimaryChange,
    onSecondaryChange,
  },
  id,
  classId,
}) => {
  const {
    contextMenu,
    handleContextMenuClose,
    handleContextMenuOpen,
    handlePreventDefaultContextMenu,
  } = useContextMenu();
  const handleAccessChange = useCallback(() => {
    let nextAccess: DiagramClassAttribute["data"]["access_"];
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
    onAccessChange(classId, id, nextAccess);
  }, [access_, classId, id, onAccessChange]);

  const handlePrimaryChange = useCallback(
    (value: string) => {
      onPrimaryChange(classId, id, value);
    },
    [classId, id, onPrimaryChange]
  );

  const handleSecondaryChange = useCallback(
    (value: string) => {
      onSecondaryChange(classId, id, value);
    },
    [classId, id, onSecondaryChange]
  );

  const handleDuplicate = useCallback(() => {
    onDuplicate(classId, id);
  }, [classId, id, onDuplicate]);

  const handleDelete = useCallback(() => {
    onDelete(classId, id);
  }, [classId, id, onDelete]);

  return (
    <>
      <Box
        component="li"
        sx={{
          cursor: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          listStyle: "none",
          height: 50,
        }}
        onContextMenu={handleContextMenuOpen}
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
      <Menu
        onContextMenu={handlePreventDefaultContextMenu}
        open={contextMenu !== undefined}
        onClose={handleContextMenuClose}
        onClick={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu}
      >
        <MenuList>
          <MenuItem onClick={handleDuplicate}>
            <ListItemText
              inset
              slotProps={{
                primary: { fontFamily: "monospace" },
              }}
            >
              Duplicate
            </ListItemText>
          </MenuItem>
          <Divider flexItem />
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText
              slotProps={{
                primary: { fontFamily: "monospace" },
              }}
            >
              Delete
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
