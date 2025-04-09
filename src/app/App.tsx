import { ClassNode } from "@/components/ClassNode";
import { DiagramClass } from "@/types/figure";
import { Box, CssBaseline } from "@mui/material";
import {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  FinalConnectionState,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  SmoothStepEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef } from "react";
import { ToastContainer } from "react-toastify";

const NODE_TYPE = {
  ClassNode: ClassNode,
};

const initNodes: Node[] = [
  {
    id: "0",
    data: {
      name: "asdas",
      attributes: [],
      methods: [],
    },
    position: { x: 0, y: 0 },
    type: "ClassNode",
    dragHandle: ".node-handle",
  },
  // {
  //   id: "1",
  //   data: {
  //     name: "q",
  //     attributes: createRandomClassAttributes(4),
  //     methods: createRandomClassMethods(3),
  //   },
  //   position: { x: 100, y: 100 },
  //   type: "ClassNode",
  //   dragHandle: ".node-handle",
  // },
];

const initEdges: Edge[] = [
  // { id: "1-2", source: "1", target: "2" },
];

let id = 2;
const getId = () => `${id++}`;

export const App = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] =
    useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] =
    useEdgesState(initEdges);

  const { screenToFlowPosition } = useReactFlow();
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onConnectEnd = useCallback(
    (
      event: MouseEvent | TouchEvent,
      connectionState: FinalConnectionState
    ) => {
      // when a connection is dropped on the pane it's not valid
      if (!connectionState.isValid) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const id = getId();
        const { clientX, clientY } =
          "changedTouches" in event
            ? event.changedTouches[0]
            : event;
        const newNode: Node<DiagramClass> = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { name: id, attributes: [], methods: [] },
          type: "ClassNode",
          dragHandle: ".handle",
          style: { strokeWidth: 16 },
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => {
          const fromId = connectionState.fromNode?.id;
          const targetId = id;
          return eds.concat({
            id: `${fromId}-${targetId}`,
            source: connectionState.fromNode?.id,
            target: id,
          } as (typeof eds)[number]);
        });
      }
    },
    [screenToFlowPosition, setEdges, setNodes]
  );

  return (
    <Box
      ref={reactFlowWrapper}
      component="div"
      sx={{ height: "100%", width: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPE}
        zoomOnDoubleClick={false}
        zoomOnScroll={false}
        preventScrolling={false}
        style={{ backgroundColor: "#F7F9FB" }}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        edgeTypes={{ default: SmoothStepEdge }}
        connectionMode={ConnectionMode.Loose}
      >
        <Background
          gap={40}
          size={2.5}
        />
        <MiniMap position="top-left" />
        <Controls position="top-right" />
      </ReactFlow>
    </Box>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div style={{ height: "100vh" }}>
      <CssBaseline />
      <ReactFlowProvider>
        <ToastContainer />
        <App />
      </ReactFlowProvider>
    </div>
  );
};
