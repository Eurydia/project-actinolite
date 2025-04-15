import React, { useCallback, useState } from "react";

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<{
    left: number;
    top: number;
  }>();

  const handleContextMenuOpen = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientX, clientY } = event;
      setContextMenu(
        contextMenu === undefined
          ? {
              left: clientX,
              top: clientY,
            }
          : undefined
      );
    },
    [contextMenu]
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
    contextMenu,
    handleContextMenuClose,
    handleContextMenuOpen,
    handlePreventDefaultContextMenu,
  };
};
