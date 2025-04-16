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

let currentNodeAttributeId = 0;
const getNextNodeAttributeId = () =>
  currentNodeAttributeId++;

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

  const onNodeAttributeAdd = useCallback(
    (
      nodeId: string,
      value: Omit<DiagramClassAttribute, "id">
    ) => {
      setNodes((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== nodeId) {
            next.push(node);
            continue;
          }
          const nextNode = structuredClone(node);
          nextNode.data.attributes.push({
            id: getNextNodeAttributeId(),
            access_: value.access_,
            primary: value.primary,
            secondary: value.secondary,
          });
          next.push(nextNode);
        }
        return next;
      });
    },
    [setNodes]
  );

  const onNodeAttributeChange = useCallback(
    (nodeId: string, value: DiagramClassAttribute) => {
      setNodes((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== nodeId) {
            next.push(node);
            continue;
          }
          const nextNode = structuredClone(node);

          nextNode.data.attributes =
            nextNode.data.attributes.map((attr) =>
              attr.id !== value.id ? attr : value
            );
        }
        return next;
      });
    },
    [setNodes]
  );

  const onNodeAttributeRemove = useCallback(
    (nodeId: string, attrId: number) => {
      setNodes((prev) => {
        const next: typeof prev = [];
        for (const node of prev) {
          if (node.id !== nodeId) {
            next.push(node);
            continue;
          }

          const nextNode = structuredClone(node);
          nextNode.data.attributes =
            nextNode.data.attributes.filter(
              ({ id }) => id !== attrId
            );
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
    onNodeAttributeAdd,
    onNodeAttributeChange,
    onNodeAttributeRemove,
  };
};
