import {
  ContentCopyRounded,
  DeleteRounded,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FC, memo, MouseEvent, useCallback } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  anchorPosition: { left: number; top: number } | undefined;
  onClose: () => void;
};
export const StyledNodeContextMenu: FC<Props> = memo(
  ({ anchorPosition, onClose }) => {
    const handleContextMenu = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      },
      []
    );
    return (
      <Menu
        open={anchorPosition !== undefined}
        onContextMenu={handleContextMenu}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        slotProps={{
          paper: {
            sx: { scrollbarWidth: "none" },
          },
        }}
      >
        <Box padding={2}>
          <Stack spacing={1}>
            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ width: "100%" }}
            />
            <OutlinedInput
              size="small"
              value={color}
              onChange={({ target }) =>
                setColor(target.value)
              }
              sx={{ fontFamily: "monospace" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disableRipple
                    size="small"
                    onClick={handleCopyColor}
                  >
                    <ContentCopyRounded />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </Box>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem onClick={onAttributeAdd}>
            <ListItemText inset>New attribute</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleAttributeDuplicate}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "attr"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Duplicate attribute
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleAttributeRemove}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "attr"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Remove attribute
            </ListItemText>
          </MenuItem>
        </MenuList>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem onClick={onMethodAdd}>
            <ListItemText inset>New method</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleMethodDuplicate}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "method"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Duplicate method
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleMethodRemove}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "method"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>Remove method</ListItemText>
          </MenuItem>
        </MenuList>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem>
            <ListItemText inset>
              Duplicate class
            </ListItemText>
          </MenuItem>
        </MenuList>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText>Remove class</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }
);
