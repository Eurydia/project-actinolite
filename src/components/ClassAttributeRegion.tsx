import { DiagramClassAttribute } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref, useCallback } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  classId: string;
  containerRef: Ref<HTMLUListElement>;
  items: DiagramClassAttribute[];
  onItemChange: (
    value: DiagramClassAttribute,
    index: number
  ) => void;
};
export const ClassAttributeRegion: FC<Props> = ({
  classId,
  containerRef,
  items,
  onItemChange,
}) => {
  const itemChangeHandlerProvider = useCallback(
    (index: number) => {
      return (value: DiagramClassAttribute) => {
        onItemChange(value, index);
      };
    },
    [onItemChange]
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
      {items.map((item, index) => (
        <ClassAttributeRegionItem
          key={`class-${classId}-attribute-${item.id}`}
          data={item}
          onChange={itemChangeHandlerProvider(index)}
        />
      ))}
    </Box>
  );
};
