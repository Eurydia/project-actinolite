import { createDiagramClassMethod } from "@/services/models";
import {
  AccessLevel,
  DiagramClassMethod,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useCallback } from "react";

export const useWrappedNodeMethodState = (
  init: DiagramClassMethod[]
) => {
  const [containerRef, items, setItems] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassMethod
  >(init, {
    group: "class-method",
    plugins: [animations()],
  });

  const onChange = useCallback(
    (value: DiagramClassMethod) => {
      setItems((prev) => {
        return prev.map((item) =>
          item.id !== value.id ? item : value
        );
      });
    },
    [setItems]
  );

  const onRemove = useCallback(
    (attrId: number) => {
      setItems((prev) => {
        return prev.filter((attr) => attr.id !== attrId);
      });
    },
    [setItems]
  );

  const onDuplicate = useCallback(
    (value: Omit<DiagramClassMethod, "id">) => {
      setItems((prev) => {
        const nextItem = createDiagramClassMethod(value);
        return prev.concat(nextItem);
      });
    },
    [setItems]
  );

  const onAdd = useCallback(() => {
    setItems((prev) => {
      const nextItem = createDiagramClassMethod({
        access_: AccessLevel.PRIVATE,
        primary: "",
        secondary: "",
      });
      return prev.concat(nextItem);
    });
  }, [setItems]);

  return {
    containerRef,
    items,
    onAdd,
    onChange,
    onDuplicate,
    onRemove,
  };
};
