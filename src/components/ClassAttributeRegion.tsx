import { DiagramClassAttribute } from "@/types/figure";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Box } from "@mui/material";
import { FC } from "react";
import { ClassAttributeItem } from "./ClassAttributeItem";

type Props = { items: DiagramClassAttribute[] };
export const ClassAttributeRegion: FC<Props> = ({
  items,
}) => {
  const [parent, dndItems] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassAttribute
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
        <ClassAttributeItem
          key={"item" + index}
          data={item}
        />
      ))}
    </Box>
  );
};
