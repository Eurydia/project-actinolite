import { DiagramClassMethod } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref, useCallback } from "react";
import { ClassMethodRegionItem } from "./ClassMethodRegionItem";

type Props = {
  classId: string;
  items: DiagramClassMethod[];
  onChange: (
    value: DiagramClassMethod,
    index: number
  ) => void;
  containerRef: Ref<HTMLUListElement>;
};
export const ClassMethodRegion: FC<Props> = ({
  items,
  classId,
  onChange,
  containerRef,
}) => {
  const onChangeHandlerProvider = useCallback(
    (index: number) => {
      return (value: DiagramClassMethod) => {
        onChange(value, index);
      };
    },
    [onChange]
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
        <ClassMethodRegionItem
          key={`class-${classId}-method-${item.id}`}
          data={item}
          onChange={onChangeHandlerProvider(index)}
        />
      ))}
    </Box>
  );
};
