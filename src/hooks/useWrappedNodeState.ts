import {
  DiagramClassAttribute,
  DiagramNodeData,
} from "@/types/figure";
import {
  Node,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import { useCallback } from "react";

let currentNodeId = 0;
const getNextNodeId = () => currentNodeId++;

export const useWrappedNodeState = () => {
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState<
    Node<DiagramNodeData>
  >([]);

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
          name: `NewClass${id}`,
          attributes: [],
          methods: [],
        },
      };
      setNodes((nds) => nds.concat(newNode));
      return id;
    },
    [screenToFlowPosition, setNodes]
  );

  const onNodeAttributesChange = useCallback(
    (nodeId: string, value: DiagramClassAttribute[]) => {
      setNodes((prev) => {
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
    [setNodes]
  );

  return {
    nodes,
    onNodesChange,
    onNodeAdd,
    onNodeAttributesChange,
  };
};
