import { Menu } from "@mui/material";
import {
  FC,
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
} from "react";

type Props = {
  closeOnSelect?: boolean;
  anchorPosition: { left: number; top: number } | undefined;
  children: ReactNode[];
  onClose: () => void;
};
export const StyledContextMenu: FC<Props> = memo(
  ({
    anchorPosition,
    closeOnSelect,
    onClose,
    children,
  }) => {
    const handleContextMenu = useCallback(
      (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      },
      []
    );

    const handleClick = useCallback(() => {
      if (closeOnSelect) {
        onClose();
      }
    }, [closeOnSelect, onClose]);

    return (
      <Menu
        open={anchorPosition !== undefined}
        onContextMenu={handleContextMenu}
        onClose={onClose}
        onClick={handleClick}
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
