import { WrappedNodeContext } from "@/context/WrappedNodeContext";
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
import { FC, useCallback, useContext } from "react";
import { StrictTextField } from "./StrictTextField";

type Props = {
  nodeId: string;
  data: DiagramClassAttribute;
};
export const ClassAttributeRegionItem: FC<Props> = ({
  data: { id, access_, primary, secondary },
  nodeId,
}) => {
  const {
    contextMenu,
    handleContextMenuClose,
    handleContextMenuOpen,
    handlePreventDefaultContextMenu,
  } = useContextMenu();

  const {
    onAttributeAdd,
    onAttributeChange,
    onAttributeRemove,
  } = useContext(WrappedNodeContext);

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
    onAttributeChange(nodeId, id, {
      access_: nextAccess,
      primary,
      secondary,
    });
  }, [
    onAttributeChange,
    access_,
    nodeId,
    id,
    primary,
    secondary,
  ]);

  const handlePrimaryChange = useCallback(
    (value: string) => {
      onAttributeChange(nodeId, id, {
        access_,
        primary: value,
        secondary,
      });
    },
    [onAttributeChange, nodeId, id, access_, secondary]
  );

  const handleSecondaryChange = useCallback(
    (value: string) => {
      onAttributeChange(nodeId, id, {
        access_,
        primary,
        secondary: value,
      });
    },
    [onAttributeChange, nodeId, id, access_, primary]
  );

  const handleDuplicate = useCallback(() => {
    onAttributeAdd(nodeId, { access_, primary, secondary });
  }, [access_, nodeId, onAttributeAdd, primary, secondary]);

  const handleDelete = useCallback(() => {
    onAttributeRemove(nodeId, id);
  }, [onAttributeRemove, nodeId, id]);

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
