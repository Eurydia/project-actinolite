import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import {
  AccessLevel,
  DiagramNodeAttributeData,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { createDiagramNodeAttributeData } from "./useWrappedNodeState";

export const useWrappedNodeAttributeState = (
  id: string
) => {
  const { nodes, onNodeAttributesChange } = useContext(
    WrappedNodeContext
  );

  const attrs = useMemo(() => {
    const attrs: DiagramNodeAttributeData[] = [];
    for (const node of nodes) {
      if (node.id === id) {
        attrs.concat(node.data.attributes);
        break;
      }
    }
    return attrs;
  }, [id, nodes]);

  const [attributeContainerRef, , setAttributeItems] =
    useDragAndDrop<
      HTMLUListElement,
      DiagramNodeAttributeData
    >(attrs, {
      group: "class-attribute",
      plugins: [animations()],
    });

  useEffect(() => {
    setAttributeItems(attrs);
  }, [attrs, setAttributeItems]);

  const onAttributeChange = useCallback(
    (value: DiagramNodeAttributeData) => {
      onNodeAttributesChange(
        id,
        attrs.map((attr) =>
          attr.id === value.id ? value : attr
        )
      );
    },
    [attrs, id, onNodeAttributesChange]
  );

  const onAttributeRemove = useCallback(
    (attrId: number) => {
      onNodeAttributesChange(
        id,
        attrs.filter((attr) => attr.id !== attrId)
      );
    },
    [attrs, id, onNodeAttributesChange]
  );

  const onAttributeDuplicate = useCallback(
    (attrId: number) => {
      const attr = attrs.find((attr) => attr.id === attrId);
      if (attr === undefined) {
        return;
      }
      const nextAttr = createDiagramNodeAttributeData(attr);
      onNodeAttributesChange(id, attrs.concat(nextAttr));
    },
    [attrs, id, onNodeAttributesChange]
  );

  const onAttributeAdd = useCallback(() => {
    const nextAttr = createDiagramNodeAttributeData({
      access_: AccessLevel.PRIVATE,
      primary: "",
      secondary: "",
    });
    onNodeAttributesChange(id, attrs.concat(nextAttr));
  }, [attrs, id, onNodeAttributesChange]);

  return {
    attributeContainerRef,
    onAttributeAdd,
    onAttributeChange,
    onAttributeDuplicate,
    onAttributeRemove,
  };
};
