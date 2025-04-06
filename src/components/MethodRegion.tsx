import { DiagramClassMethod } from "@/types/figure";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Box } from "@mui/material";
import { FC } from "react";
import { MethodItem } from "./MethodRegionItem";

type Props = { id: string; items: DiagramClassMethod[] };
export const MethodRegion: FC<Props> = ({ id, items }) => {
  const [parent, dndItems] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassMethod
  >(items, {
    group: "class-method",
  });

  return (
    <Box
      component="ul"
      ref={parent}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        minHeight: 50,
        borderWidth: 4,
        minWidth: 400,
        backgroundColor: "pink",
      }}
    >
      {dndItems.map((item, index) => (
        <MethodItem
          key={"item" + index}
          data={item}
        />
      ))}
    </Box>
  );
};
