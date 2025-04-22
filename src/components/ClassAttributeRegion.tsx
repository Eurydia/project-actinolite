import { DiagramNodeAttributeData } from "@/types/figure";
import { Box } from "@mui/material";
import React, { FC, Ref, useCallback } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  dragHandle: string;
  nodeId: string;
  containerRef: Ref<HTMLUListElement>;
  items: DiagramNodeAttributeData[];
  onChange: (value: DiagramNodeAttributeData) => void;
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
  dragHandle,
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
        minHeight: 100,
        listStyleType: "none",
        padding: 0,
      }}
    >
      {items.map((item) => (
        <ClassAttributeRegionItem
          dragHandle={dragHandle}
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
