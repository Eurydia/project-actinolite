import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { Box } from "@mui/material";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  EdgeTypes,
  FinalConnectionState,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import { MarkerProvider } from "./MarkerProvider";
import { StyledEdge } from "./StyledEdge";
import { StyledNode } from "./StyledNode";

const NODE_TYPES = {
  ClassNode: StyledNode,
};

const EDGE_TYPES: EdgeTypes = {
  default: StyledEdge,
};

export const FlowRenderArea = memo(() => {
  const { onNodeAdd } = useContext(WrappedNodeContext);
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

  const hasInjectedMarkerProviderRef = useRef(false);

  useEffect(() => {
    if (hasInjectedMarkerProviderRef.current) {
      return;
    }
    const targetElement = document.querySelector(
      ".react-flow__viewport"
    );
    if (targetElement !== null) {
      hasInjectedMarkerProviderRef.current = true;
    }
  }, []);

  return (
    <Box
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
        defaultViewport={{ zoom: 1.2, x: 0, y: 0 }}
        snapToGrid
      >
        <Background
          gap={40}
          size={2.5}
        />
        <MiniMap position="top-left" />
        <Controls position="top-right" />
        {hasInjectedMarkerProviderRef.current &&
          createPortal(
            <MarkerProvider />,
            document.querySelector(".react-flow__viewport")!
          )}
      </ReactFlow>
    </Box>
  );
});
