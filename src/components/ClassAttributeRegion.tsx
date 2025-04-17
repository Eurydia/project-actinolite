import { DiagramClassAttribute } from "@/types/figure";
import { Box } from "@mui/material";
import React, { FC, Ref, useCallback } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  nodeId: string;
  containerRef: Ref<HTMLUListElement>;
  items: DiagramClassAttribute[];
  onChange: (value: DiagramClassAttribute) => void;
  onContextMenu: (
    e: React.MouseEvent,
    attrId: number
  ) => void;
};
export const ClassAttributeRegion: FC<Props> = ({
  containerRef,
  nodeId,
  items,
  onChange,
  onContextMenu,
}) => {
  const onContextMenuHandlerProvider = useCallback(
    (attrId: number) => (e: React.MouseEvent) =>
      onContextMenu(e, attrId),
    [onContextMenu]
  );

  return (
    <Box
      component="ul"
      ref={containerRef}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minHeight: 50,
        minWidth: 400,
      }}
    >
      {items.map((item) => (
        <ClassAttributeRegionItem
          key={`class-${nodeId}-attribute-${item.id}`}
          data={item}
          onChange={onChange}
          onContextMenu={onContextMenuHandlerProvider(
            item.id
          )}
        />
      ))}
    </Box>
  );
};
