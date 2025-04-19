import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useExportMedia } from "@/hooks/useExportMedia";
import {
  Divider,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, {
  FC,
  memo,
  useCallback,
  useContext,
} from "react";

type Props = {
  onClose: () => void;
  anchorPosition: { left: number; top: number } | undefined;
};

export const AppContextMenu: FC<Props> = memo(
  ({ onClose, anchorPosition }) => {
    const handleContextMenu = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      },
      []
    );

    const { exportAsJepg, exportAsPng, exportAsSvg } =
      useExportMedia();

    const { onNodeAdd } = useContext(WrappedNodeContext);

    const handleNodeAdd = useCallback(() => {
      if (anchorPosition === undefined) {
        return;
      }
      onNodeAdd(anchorPosition);
    }, [anchorPosition, onNodeAdd]);

    return (
      <Menu
        open={anchorPosition !== undefined}
        onContextMenu={handleContextMenu}
        onClose={onClose}
        onClick={onClose}
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
      >
        <MenuItem onClick={handleNodeAdd}>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Add class
          </ListItemText>
        </MenuItem>
        <Divider flexItem />
        <MenuItem onClick={exportAsPng}>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Export as PNG
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={exportAsJepg}>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Export as JPEG
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={exportAsSvg}>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Export as SVG
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText
            inset
            // onClick={handleExportWorkspace}
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Save workspace
          </ListItemText>
        </MenuItem>
      </Menu>
    );
  }
);
