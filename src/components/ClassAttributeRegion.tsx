import { DiagramClassAttribute } from "@/types/figure";
import { Box } from "@mui/material";
import { FC, Ref } from "react";
import { ClassAttributeRegionItem } from "./ClassAttributeRegionItem";

type Props = {
  classId: string;
  containerRef: Ref<HTMLUListElement>;
  items: DiagramClassAttribute[];
};
export const ClassAttributeRegion: FC<Props> = ({
  classId,
  containerRef,
  items,
}) => {
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
          key={`class-${classId}-attribute-${item.id}`}
          classId={classId}
          {...item}
        />
      ))}
    </Box>
  );
};
