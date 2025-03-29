import { SnapModifier } from "@dnd-kit/abstract/modifiers";
import {
  DragDropProvider,
  useDroppable,
} from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { Box } from "@mui/material";
import { useState } from "react";
import { ClassStruct } from "./components/ClassStruct";
import { createFieldItems } from "./services/gen";

export const App = () => {
  const [items, setItems] = useState(createFieldItems(5));
  const { ref } = useSortable({
    id: "class1",
    index: 0,
    type: "class",
    accept: [],
    modifiers: [
      SnapModifier.configure({
        size: { x: 20, y: 20 },
      }),
    ],
  });
  const { ref: workspaceRef, isDropTarget } = useDroppable({
    id: "workspace",
  });

  return (
    <DragDropProvider>
      <Box
        ref={workspaceRef}
        sx={{
          backgroundColor: isDropTarget
            ? "primary.light"
            : undefined,
          height: 6000,
          width: "100%",
        }}
      >
        <Box ref={ref}>
          <ClassStruct
            items={items}
            onAdd={() =>
              setItems((prev) => {
                const next = [...prev];
                next.push(...createFieldItems(1));
                return next;
              })
            }
          />
        </Box>
      </Box>
    </DragDropProvider>
  );
};

