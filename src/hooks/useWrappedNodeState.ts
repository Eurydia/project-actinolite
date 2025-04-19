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
import { useCallback } from "react";

let currentNodeId = 0;
const getNextNodeId = () => currentNodeId++;

let GLOBAL_METHOD_ID = 0;
const createDiagramNodeMethodData = (
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
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, onNodesChange] = useNodesState<
    Node<DiagramNodeData>
  >([]);

  const onNodesRestore = useCallback(
    (value: Node<DiagramNodeData>[]) => {
      let maxNodeId = 0;
      const seenIds = new Set<string>();
      const checkedNodes: typeof value = [];
      for (const node of value) {
        if (seenIds.has(node.id)) {
          continue;
        }
        checkedNodes.push(node);
        seenIds.add(node.id);
        const nodeId = Number.parseInt(node.id);
        maxNodeId = nodeId > maxNodeId ? nodeId : maxNodeId;
      }
      currentNodeId = maxNodeId;
      onNodesChange(checkedNodes);
    },
    [onNodesChange]
  );

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

  const onNodeAttributesChange = useCallback(
    (nodeId: string, value: DiagramNodeAttributeData[]) => {
      onNodesChange((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== nodeId) {
            next.push(node);
            continue;
          }
          const nextNode = structuredClone(node);
          nextNode.data.attributes = value;
          next.push(nextNode);
        }
        return next;
      });
    },
    [onNodesChange]
  );

  const onNodeMethodsChange = useCallback(
    (nodeId: string, value: DiagramNodeMethodData[]) => {
      onNodesChange((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== nodeId) {
            next.push(node);
            continue;
          }
          const nextNode = structuredClone(node);
          nextNode.data.methods = value;
          next.push(nextNode);
        }
        return next;
      });
    },
    [onNodesChange]
  );

  return {
    nodes,
    onNodesChange,
    onNodeAdd,
    onNodeAttributesChange,
    onNodeMethodsChange,
  };
};
