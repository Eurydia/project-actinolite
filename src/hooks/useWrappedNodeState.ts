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

let CURRENT_NODE_ID = 0;
const getNextNodeId = () => CURRENT_NODE_ID++;

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
  const { screenToFlowPosition } = useReactFlow();

  const [nodes, onNodesChange, onNodeChangeMany] =
    useNodesState<Node<DiagramNodeData>>([]);

  const onNodesRestore = useCallback(
    (value: Node<DiagramNodeData>[]) => {
      const nodeIds = new Set<string>();
      const attrIds = new Set<number>();
      const methodIds = new Set<number>();
      const checkedNodes: Node<DiagramNodeData>[] = [];
      for (const node of value) {
        if (nodeIds.has(node.id)) {
          continue;
        }
        nodeIds.add(node.id);
        const checkedAttrs: DiagramNodeAttributeData[] = [];
        for (const attr of node.data.attributes) {
          if (attrIds.has(attr.id)) {
            continue;
          }
          attrIds.add(attr.id);
          checkedAttrs.push(attr);
        }
        const checkedMethods: DiagramNodeMethodData[] = [];
        for (const method of node.data.methods) {
          if (methodIds.has(method.id)) {
            continue;
          }
          methodIds.add(method.id);
          checkedMethods.push(method);
        }
        node.data.attributes = checkedAttrs;
        node.data.methods = checkedMethods;
        checkedNodes.push(node);
      }

      CURRENT_NODE_ID = Math.max(
        ...[...nodeIds].map((id) => Number.parseInt(id))
      );
      GLOBAL_ATTRIBUTE_ID = Math.max(...attrIds);
      GLOBAL_METHOD_ID = Math.max(...methodIds);
      onNodesChange(value);
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
    onNodesRestore,
    onNodeAdd,
    onNodeAttributesChange,
    onNodeMethodsChange,
    onNodeChangeMany,
  };
};
