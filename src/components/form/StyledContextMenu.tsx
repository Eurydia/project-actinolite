import { Menu } from "@mui/material";
import {
  FC,
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";

type Props = {
  anchorPosition: { left: number; top: number } | undefined;
  onClose: () => void;
  children: ReactNode[];
};
export const StyledContextMenu: FC<Props> = memo(
  ({ anchorPosition, onClose, children }) => {
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
        {children}
      </Menu>
    );
  }
);
