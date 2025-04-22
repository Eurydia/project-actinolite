import {
  AccessLevel,
  DiagramNodeAttributeData,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useCallback } from "react";
import { createDiagramNodeAttributeData } from "./useWrappedNodeState";

export const useWrappedNodeAttributeState = (
  dragHandle: string,
  initItems: DiagramNodeAttributeData[]
) => {
  const [containerRef, items, setItems] = useDragAndDrop<
    HTMLUListElement,
    DiagramNodeAttributeData
  >(initItems, {
    group: "class-attribute",
    dragHandle,
    plugins: [animations()],
  });

  const onChange = useCallback(
    (value: DiagramNodeAttributeData) => {
      setItems((prev) => {
        return prev.map((item) =>
          item.id === value.id ? value : item
        );
      });
    },
    [setItems]
  );

  const onRemove = useCallback(
    (attrId: number) => {
      setItems((prev) => {
        return prev.filter((item) => item.id !== attrId);
      });
    },
    [setItems]
  );

  const onDuplicate = useCallback(
    (attrId: number) => {
      setItems((prev) => {
        const target = prev.find(
          (attr) => attr.id === attrId
        );
        if (target === undefined) {
          return prev;
        }
        return prev.concat(
          createDiagramNodeAttributeData(target)
        );
      });
    },
    [setItems]
  );

  const onAdd = useCallback(() => {
    setItems((prev) => {
      return prev.concat(
        createDiagramNodeAttributeData({
          access_: AccessLevel.PRIVATE,
          primary: "",
          secondary: "",
        })
      );
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
