import {
  DiagramNodeAttributeData,
  DiagramNodeData,
  DiagramNodeMethodData,
} from "@/types/figure";
import {
  Node,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";

let GLOBAL_NODE_ID = 0;
const getNextNodeId = () => GLOBAL_NODE_ID++;

let GLOBAL_METHOD_ID = 0;
export const createDiagramNodeMethodData = (
  value: Omit<DiagramNodeMethodData, "id">
): DiagramNodeMethodData => {
  return {
    id: GLOBAL_METHOD_ID++,
    access_: value.access_,
    primary: value.primary,
    secondary: value.secondary,
  };
};

let GLOBAL_ATTRIBUTE_ID = 0;
export const createDiagramNodeAttributeData = (
  init: Omit<DiagramNodeAttributeData, "id">
): DiagramNodeAttributeData => {
  return {
    id: GLOBAL_ATTRIBUTE_ID++,
    access_: init.access_,
    primary: init.primary,
    secondary: init.secondary,
  };
};

export const useWrappedNodeState = () => {
  const init = useMemo(() => {
    const saved = localStorage.getItem(
      "actinolite-autosave-nodes"
    );
    if (saved === null) {
      return [];
    }
    try {
      return JSON.parse(saved) as Node<DiagramNodeData>[];
    } catch {
      localStorage.removeItem("actinolite-autosave-nodes");
      return [];
    }
  }, []);
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, onNodesChange, onNodeChangeMany] =
    useNodesState<Node<DiagramNodeData>>([]);

  useEffect(() => {
    localStorage.setItem(
      "actinolite-autosave-nodes",
      JSON.stringify(nodes)
    );
  }, [nodes]);

  useEffect(() => {
    let nodeIdMax = 0;
    let nodeAttrIdMax = 0;
    let nodeMthdIdMax = 0;
    init.forEach((node) => {
      nodeIdMax =
        Number.parseInt(node.id) > nodeIdMax
          ? Number.parseInt(node.id)
          : nodeIdMax;
      node.data.attributes.forEach(
        (item) =>
          (nodeAttrIdMax =
            item.id > nodeAttrIdMax
              ? item.id
              : nodeAttrIdMax)
      );
      node.data.methods.forEach(
        (item) =>
          (nodeMthdIdMax =
            item.id > nodeMthdIdMax
              ? item.id
              : nodeMthdIdMax)
      );
      GLOBAL_NODE_ID = nodeIdMax + 1;
      GLOBAL_ATTRIBUTE_ID = nodeAttrIdMax + 1;
      GLOBAL_METHOD_ID = nodeMthdIdMax + 1;
    });

    onNodesChange(init);
  }, [init, onNodesChange]);

  const onNodeAdd = useCallback(
    (position: { left: number; top: number }) => {
      const id = getNextNodeId().toString();
      const newNode: Node<DiagramNodeData> = {
        id,
        position: screenToFlowPosition({
          x: position.left,
          y: position.top,
        }),
        type: "ClassNode",
        dragHandle: ".node-handle",
        data: {
          color: "#000000",
          name: `NewClass${id}`,
          attributes: [],
          methods: [],
        },
      };
      onNodesChange((nds) => nds.concat(newNode));
      return id;
    },
    [screenToFlowPosition, onNodesChange]
  );

  const onNodeDataChange = useCallback(
    (id: string, value: DiagramNodeData) => {
      onNodesChange((prev) => {
        return prev.map((node) => {
          if (node.id !== id) {
            return node;
          }
          const nextNode = structuredClone(node);
          nextNode.data = value;
          return nextNode;
        });
      });
    },
    [onNodesChange]
  );

  return {
    nodes,
    onNodesChange,
    onNodeAdd,
    onNodeChangeMany,
    onNodeDataChange,
  };
};
