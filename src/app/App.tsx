import { ClassNode } from "@/components/ClassNode";
import {
  createClassAttributes,
  createClassMethod,
} from "@/services/gen";
import { DragDropProvider } from "@dnd-kit/react";
import { Box } from "@mui/material";
import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  NodeTypes,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initNodes: Node[] = [
  // {
  //   id: "1",
  //   data: { className: "hi", attributes: [], methods: [] },
  //   position: { x: 100, y: 100 },
  //   type: "ClassNode",
  // },
  {
    id: "2",
    data: {
      name: "asdas",
      attributes: createClassAttributes(4),
      methods: createClassMethod(3),
    },
    position: { x: 0, y: 0 },
    type: "ClassNode",
  },
];

const initEdges: Edge[] = [
  // { id: "1-2", source: "1", target: "2" },
];

const NODE_TYPE: NodeTypes = {
  ClassNode: ClassNode,
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
      <Box
        sx={{
          height: "98vh",
        }}
      >
        <Box
          component="div"
          sx={{ height: "100%", width: "100%" }}
        >
          <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            fitView
            snapToGrid
            nodeTypes={NODE_TYPE}
            zoomOnDoubleClick={false}
            zoomOnScroll={false}
            preventScrolling={false}
          >
            <Background
              gap={40}
              size={2.5}
            />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </Box>
      </Box>
    </DragDropProvider>
  );
};

