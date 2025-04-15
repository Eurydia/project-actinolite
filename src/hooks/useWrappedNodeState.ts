import {
  DiagramClassAttribute,
  DiagramClassMethod,
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

  const handleAttributeChange = useCallback(
    (id: string, value: DiagramClassAttribute[]) => {
      setNodes((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== id) next.push(node);

          const nextNode = structuredClone(node);
          nextNode.data.attributes = value;
          next.push(nextNode);
        }
        return next;
      });
    },
    [setNodes]
  );

  const createNewNode = useCallback(
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
          onAttributeChange: handleAttributeChange,
          onMethodChange: function (
            id: number,
            value: DiagramClassMethod[]
          ): void {
            throw new Error("Function not implemented.");
          },
        },
      };
      setNodes((nds) => nds.concat(newNode));
      return id;
    },
    [handleAttributeChange, screenToFlowPosition, setNodes]
  );
  return {
    createNewNode,
    nodes,
    setNodes,
    onNodesChange,
  };
};
