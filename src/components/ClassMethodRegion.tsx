import { DiagramNodeMethodData } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref, useCallback } from "react";
import { ClassMethodRegionItem } from "./ClassMethodRegionItem";

type Props = {
  dragHandle: string;
  containerRef: Ref<HTMLUListElement>;
  nodeId: string;
  items: DiagramNodeMethodData[];
  onChange: (value: DiagramNodeMethodData) => void;
  onContextMenu: (
    e: React.MouseEvent,
    methodId: number
  ) => void;
};
export const ClassMethodRegion: FC<Props> = ({
  items,
  nodeId,
  containerRef,
  onChange,
  onContextMenu,
  dragHandle,
}) => {
  const onChangeHandlerProvider = useCallback(
    (methodId: number) => (e: React.MouseEvent) =>
      onContextMenu(e, methodId),
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
        paddingX: 0,
      }}
    >
      {items.map((item) => (
        <ClassMethodRegionItem
          dragHandle={dragHandle}
          key={`class-${nodeId}-method-${item.id}`}
          data={item}
          onChange={onChange}
          onContextMenu={onChangeHandlerProvider(item.id)}
        />
      ))}
    </Box>
  );
};
