import { DiagramClassAttribute } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref, useCallback } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  containerRef: Ref<HTMLDivElement>;
  items: DiagramClassAttribute[];
  onItemChange: (
    value: DiagramClassAttribute,
    index: number
  ) => void;
};
export const ClassAttributeRegion: FC<Props> = ({
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
          key={`class-attribute-item-${index}`}
          data={item}
          onChange={itemChangeHandlerProvider(index)}
        />
      ))}
    </Box>
  );
};
