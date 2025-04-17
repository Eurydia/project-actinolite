import React, { useCallback, useState } from "react";

export const useContextMenu = () => {
  const [contextMenuPos, setContextMenu] = useState<{
    left: number;
    top: number;
  }>();

  const handleContextMenuOpen = useCallback(
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

  const handleContextMenuClose = useCallback(() => {
    setContextMenu(undefined);
  }, []);

  const handlePreventDefaultContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  return {
    contextMenuPos,
    handleContextMenuClose,
    handleContextMenuOpen,
    handlePreventDefaultContextMenu,
  };
};
