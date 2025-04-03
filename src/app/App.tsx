import { ClassNode } from "@/components/ClassNode";
import { DragDropProvider } from "@dnd-kit/react";
import { Box, Container } from "@mui/material";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initNodes: Node[] = [
  {
    id: "1",
    data: { className: "hi", attributes: [] },
    position: { x: 0, y: 0 },
    type: "UMLClassNode",
    dragHandle: ".handle",
  },
  {
    id: "2",
    data: { className: "asdas", attributes: [] },
    position: { x: 0, y: 0 },
    type: "UMLClassNode",
    dragHandle: ".handle",
  },
];

const initEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2" },
];

const NODE_TYPE: NodeTypes = {
  UMLClassNode: ClassNode,
};
export const App = () => {
  const [nodes, setNodes] = useState(initNodes);
  const [edges, setEdges] = useState(initEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
      console.debug(changes);
    },
    []
  );
  return (
    <DragDropProvider>
      <Container>
        <Box sx={{ height: "90vh" }}>
          <Box sx={{ height: "100%" }}>
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              fitView
              snapToGrid
              nodeTypes={NODE_TYPE}
              snapGrid={[25, 25]}
            >
              <Background gap={25} />
              <Controls />
            </ReactFlow>
          </Box>
        </Box>
      </Container>
    </DragDropProvider>
  );
};

