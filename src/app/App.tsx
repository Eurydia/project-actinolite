import { WrappedEdgeContext } from "@/context/WrappedEdgeContext";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
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
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const [rInstance, setRInstance] =
    useState<
      ReactFlowInstance<
        Node<DiagramNodeData>,
        Edge<DiagramEdgeData>
      >
    >();

  const wrappedNodeState = useWrappedNodeState();
  const wrappedEdgeState = useWrappedEdgeState();

  const handleRestoreSession = useCallback(() => {
    wrappedNodeState.onNodesChange([]);
    wrappedEdgeState.onEdgesChange([]);
  }, [
    wrappedNodeState.onNodesChange,
    wrappedEdgeState.onEdgesChange,
  ]);

  return (
    <WrappedNodeContext.Provider value={wrappedNodeState}>
      <WrappedEdgeContext.Provider value={wrappedEdgeState}>
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
      </WrappedEdgeContext.Provider>
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
