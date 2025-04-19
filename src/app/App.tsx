import { ClassNode } from "@/components/ClassNode";
import { StyledEdge } from "@/components/diagram/StyledEdge";
import { MarkerProvider } from "@/components/flow/MarkerProvider";
import { AppContextMenu } from "@/components/form/AppContextMenu";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import { exportWorkspace } from "@/services/session/export";
import {
  DiagramEdgeData,
  DiagramNodeData,
} from "@/types/figure";
import { Box, CssBaseline } from "@mui/material";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  EdgeTypes,
  FinalConnectionState,
  MiniMap,
  Node,
  ReactFlow,
  ReactFlowInstance,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

const NODE_TYPES = {
  ClassNode: ClassNode,
};

const EDGE_TYPES: EdgeTypes = {
  default: StyledEdge,
};

export const App = () => {
  const reactFlowWrapper = useRef(null);

  const [rInstance, setRInstance] =
    useState<
      ReactFlowInstance<
        Node<DiagramNodeData>,
        Edge<DiagramEdgeData>
      >
    >();

  const handleExportWorkspace = useCallback(() => {
    if (rInstance !== undefined) {
      exportWorkspace(rInstance);
    }
  }, [rInstance]);

  const { nodes, onNodeAdd, onNodesChange, ...rest } =
    useWrappedNodeState();
  const { edges, setEdges, onEdgesChange, createNewEdge } =
    useWrappedEdgeState();
  const {
    contextMenuPos,
    handleContextMenuClose,
    handleContextMenuOpen,
  } = useContextMenu();

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
      let targetNodeId: string | undefined = undefined;

      if (
        connectionState.isValid &&
        connectionState.toNode !== null
      ) {
        targetNodeId = connectionState.toNode.id;
      } else {
        const { clientX, clientY } =
          "changedTouches" in event
            ? event.changedTouches[0]
            : event;

        targetNodeId = onNodeAdd({
          top: clientY,
          left: clientX,
        });
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
    [createNewEdge, onNodeAdd, setEdges]
  );

  const injectedRef = useRef(false);

  useEffect(() => {
    if (injectedRef.current) {
      return;
    }
    const targetElement = document.querySelector(
      ".react-flow__viewport"
    );
    if (targetElement !== null) {
      injectedRef.current = true;
    }
  }, []);

  return (
    <WrappedNodeContext.Provider
      value={{ onNodeAdd, ...rest }}
    >
      <Box
        ref={reactFlowWrapper}
        component="div"
        sx={{ height: "100%", width: "100%" }}
      >
        <ReactFlow
          onInit={setRInstance}
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
          onContextMenu={handleContextMenuOpen}
          defaultViewport={{ zoom: 1.2, x: 0, y: 0 }}
          snapToGrid
        >
          <Background
            gap={40}
            size={2.5}
          />
          <MiniMap position="top-left" />
          <Controls position="top-right" />
          {injectedRef.current &&
            createPortal(
              <MarkerProvider />,
              document.querySelector(
                ".react-flow__viewport"
              )!
            )}
        </ReactFlow>
      </Box>
      <AppContextMenu
        onClose={handleContextMenuClose}
        anchorPosition={contextMenuPos}
      />
    </WrappedNodeContext.Provider>
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
