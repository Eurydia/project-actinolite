import React, { useCallback, useState } from "react";

export const useContextMenu = () => {
  const [contextMenuPos, setContextMenu] = useState<{
    left: number;
    top: number;
  }>();

  const onContextMenuOpen = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientX, clientY } = event;
      setContextMenu(
        contextMenuPos === undefined
          ? {
              left: clientX,
              top: clientY,
            }
          : undefined
      );
    },
    [contextMenuPos]
  );

  const onContextMenuClose = useCallback(() => {
    setContextMenu(undefined);
  }, []);

  return {
    contextMenuPos,
    onContextMenuClose,
    onContextMenuOpen,
  };
};
