import { StyledEdge } from "@/components/flow/StyledEdge";
import { StyledNode } from "@/components/flow/StyledNode";
import { FileInput } from "@/components/form/SessionFIleInput";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import {
  DiagramEdgeData,
  DiagramNodeData,
} from "@/types/figure";
import {
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import {
  addEdge,
  Connection,
  Edge,
  EdgeTypes,
  FinalConnectionState,
  Node,
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
import { ToastContainer } from "react-toastify";

const NODE_TYPES = {
  ClassNode: StyledNode,
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

  // const handleExportWorkspace = useCallback(() => {
  //   if (rInstance !== undefined) {
  //     exportWorkspace(rInstance);
  //   }
  // }, [rInstance]);

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
      {/* <Box
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
      </Box> */}
      {/*       
      <AppContextMenu
        onClose={handleContextMenuClose}
        anchorPosition={contextMenuPos}
      /> */}
      <Dialog
        open
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <FileInput />
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            variant="text"
          >
            close
          </Button>
        </DialogActions>
      </Dialog>
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
