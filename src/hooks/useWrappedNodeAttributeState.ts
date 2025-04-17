import { createClassAttribute } from "@/services/models";
import {
  AccessLevel,
  DiagramClassAttribute,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useCallback } from "react";

export const useWrappedNodeAttributeState = (
  init: DiagramClassAttribute[]
) => {
  const [
    attributeContainerRef,
    attributeItems,
    setAttributeItems,
  ] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassAttribute
  >(init, {
    group: "class-attribute",
    plugins: [animations()],
  });

  const onAttributeChange = useCallback(
    (value: DiagramClassAttribute) => {
      setAttributeItems((prev) => {
        return prev.map((attr) =>
          attr.id !== value.id ? attr : value
        );
      });
    },
    [setAttributeItems]
  );

  const onAttributeRemove = useCallback(
    (attrId: number) => {
      setAttributeItems((prev) => {
        return prev.filter((attr) => attr.id !== attrId);
      });
    },
    [setAttributeItems]
  );

  const onAttributeDuplicate = useCallback(
    (attrId: number) => {
      setAttributeItems((prev) => {
        const attr = prev.find(
          (attr) => attr.id === attrId
        );
        if (attr === undefined) {
          return prev;
        }
        const nextAttr = createClassAttribute(attr);
        return prev.concat(nextAttr);
      });
    },
    [setAttributeItems]
  );

  const onAttributeAdd = useCallback(() => {
    setAttributeItems((prev) => {
      const nextAttr = createClassAttribute({
        access_: AccessLevel.PRIVATE,
        primary: "",
        secondary: "",
      });
      return prev.concat(nextAttr);
    });
  }, [setAttributeItems]);

  return {
    attributeContainerRef,
    attributeItems,
    onAttributeAdd,
    onAttributeChange,
    onAttributeDuplicate,
    onAttributeRemove,
  };
};
