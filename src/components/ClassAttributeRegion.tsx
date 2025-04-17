import { DiagramClassAttribute } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref, useCallback } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  nodeId: string;
  containerRef: Ref<HTMLUListElement>;
  items: DiagramClassAttribute[];
  onChange: (value: DiagramClassAttribute) => void;
  onDuplicate: (
    value: Omit<DiagramClassAttribute, "id">
  ) => void;
  onRemove: (attrId: number) => void;
};
export const ClassAttributeRegion: FC<Props> = ({
  containerRef,
  nodeId,
  items,
  onChange,
  onDuplicate,
  onRemove,
}) => {
  const onDuplicateHandlerProvider = useCallback(
    (item: DiagramClassAttribute) => () =>
      onDuplicate(item),
    [onDuplicate]
  );

  const onRemoveHandlerProvider = useCallback(
    (attrId: number) => () => onRemove(attrId),
    [onRemove]
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
          onDuplicate={onDuplicateHandlerProvider(item)}
          onRemove={onRemoveHandlerProvider(item.id)}
        />
      ))}
    </Box>
  );
};
