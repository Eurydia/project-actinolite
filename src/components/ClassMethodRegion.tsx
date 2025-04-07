import { DiagramClassMethod } from "@/types/figure";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Box } from "@mui/material";
import { FC } from "react";
import { ClassMethodRegionItem } from "./ClassMethodRegionItem";

type Props = { id: string; items: DiagramClassMethod[] };
export const ClassMethodRegion: FC<Props> = ({
  items,
  id,
}) => {
  const [parent, dndItems] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassMethod
  >(items, {
    group: "class-method",
  });

  return (
    <Box
      ref={parent}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minHeight: 50,
        minWidth: 400,
      }}
    >
      {dndItems.map((item, index) => (
        <ClassMethodRegionItem
          key={"item" + index}
          data={item}
        />
      ))}
    </Box>
  );
};
