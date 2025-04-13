import { ClassNode } from "@/components/ClassNode";
import { StyledEdge } from "@/components/diagram/StyledEdge";
import { MarkerProvider } from "@/components/flow/MarkerProvider";
import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { DiagramNodeData } from "@/types/figure";
import {
  Box,
  CssBaseline,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  EdgeTypes,
  FinalConnectionState,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

const NODE_TYPES = {
  ClassNode: ClassNode,
};

const initNodes = [
  {
    id: "0",
    data: {
      name: "asdas",
      attributes: [],
      methods: [],
    } as DiagramNodeData,
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

const EDGE_TYPES: EdgeTypes = {
  default: StyledEdge,
};

let id = 2;
const getId = () => `${id++}`;

export const App = () => {
  const reactFlowWrapper = useRef(null);

  const [nodes, setNodes, onNodesChange] =
    useNodesState<Node<DiagramNodeData>>(initNodes);
  const { edges, setEdges, onEdgesChange, createNewEdge } =
    useWrappedEdgeState();

  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const [contextMenu, setContextMenu] = useState<{
    left: number;
    top: number;
  }>();

  const handleContextMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const { clientX, clientY } = event;
      setContextMenu(
        contextMenu === undefined
          ? {
              left: clientX,
              top: clientY,
            }
          : undefined
      );
    },
    [contextMenu]
  );

  const handleClose = useCallback(() => {
    setContextMenu(undefined);
  }, []);

  const onConnectEnd = useCallback(
    (
      event: MouseEvent | TouchEvent,
      connectionState: FinalConnectionState
    ) => {
      let targetNodeId: string | undefined = undefined;
      if (
        connectionState.isValid &&
        connectionState.toNode !== null
      ) {
        targetNodeId = connectionState.toNode.id;
      } else {
        targetNodeId = getId();
        const { clientX, clientY } =
          "changedTouches" in event
            ? event.changedTouches[0]
            : event;

        const newNode: Node<DiagramNodeData> = {
          id: targetNodeId,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: {
            name: `NewClass${targetNodeId}`,
            attributes: [],
            methods: [],
          },
          type: "ClassNode",
          dragHandle: ".node-handle",
        };
        setNodes((nds) => nds.concat(newNode));
      }

      if (targetNodeId !== undefined) {
        setEdges((prev) => {
          if (connectionState.fromNode === null) {
            return prev;
          }
          const next = [...prev];
          const sourceNodeId = connectionState.fromNode.id;
          next.push(
            createNewEdge(sourceNodeId, targetNodeId)
          );
          return next;
        });
      }
    },
    [
      createNewEdge,
      screenToFlowPosition,
      setEdges,
      setNodes,
    ]
  );

  const handleNodeAdd = useCallback(() => {
    if (contextMenu === undefined) {
      return;
    }
    const id = getId();
    const newNode: Node<DiagramNodeData> = {
      id,
      position: screenToFlowPosition({
        x: contextMenu.left,
        y: contextMenu.top,
      }),
      data: {
        name: `NewClass${id}`,
        attributes: [],
        methods: [],
      },
      type: "ClassNode",
      dragHandle: ".node-handle",
    };

    setNodes((nds) => nds.concat(newNode));
  }, [contextMenu, screenToFlowPosition, setNodes]);

  return (
    <>
      <Box
        ref={reactFlowWrapper}
        component="div"
        sx={{ height: "100%", width: "100%" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={NODE_TYPES}
          edgeTypes={EDGE_TYPES}
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
          onContextMenu={handleContextMenu}
        >
          <Background
            gap={40}
            size={2.5}
          />
          <MiniMap position="top-left" />
          <Controls position="top-right" />
        </ReactFlow>
      </Box>
      <Menu
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        open={contextMenu !== undefined}
        onClose={handleClose}
        onClick={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu}
      >
        <MenuItem onClick={handleNodeAdd}>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Add class
          </ListItemText>
        </MenuItem>
        <Divider flexItem />
        <MenuItem>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Export as PNG
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Export as SVG
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemText
            inset
            slotProps={{
              primary: { fontFamily: "monospace" },
            }}
          >
            Save workspace
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div style={{ height: "100vh" }}>
      <CssBaseline />
      <MarkerProvider />
      <ReactFlowProvider>
        <ToastContainer />
        <App />
      </ReactFlowProvider>
    </div>
  );
};
