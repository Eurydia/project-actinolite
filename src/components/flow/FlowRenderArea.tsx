import { WrappedEdgeContext } from "@/context/WrappedEdgeContext";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { createEdge } from "@/hooks/useWrappedEdgeState";
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
  FC,
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

export const FlowRenderArea: FC = memo(() => {
  const { nodes, onNodeAdd, onNodeChangeMany } = useContext(
    WrappedNodeContext
  );
  const { edges, onEdgesChange, onEdgeChangeMany } =
    useContext(WrappedEdgeContext);
  const onConnect = useCallback(
    (params: Connection) =>
      onEdgesChange((eds) => addEdge(params, eds)),
    [onEdgesChange]
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
      const sourceNode = connectionState.fromNode;
      if (
        targetNodeId !== undefined &&
        sourceNode !== null
      ) {
        onEdgesChange((prev) => {
          return prev.concat(
            createEdge(sourceNode.id, targetNodeId)
          );
        });
      }
    },
    [onEdgesChange, onNodeAdd]
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
        onNodesChange={onNodeChangeMany}
        onEdgesChange={onEdgeChangeMany}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        defaultViewport={{ zoom: 1, x: 0, y: 0 }}
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
