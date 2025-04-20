import { FlowRenderArea } from "@/components/flow/FlowRenderArea";
import { WrappedEdgeContext } from "@/context/WrappedEdgeContext";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import {
  DiagramEdgeData,
  DiagramNodeData,
} from "@/types/figure";
import { CssBaseline } from "@mui/material";
import {
  Edge,
  Node,
  ReactFlowInstance,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const [rInstance, setFlowInstance] =
    useState<
      ReactFlowInstance<
        Node<DiagramNodeData>,
        Edge<DiagramEdgeData>
      >
    >();

  const wrappedNodeState = useWrappedNodeState();
  const wrappedEdgeState = useWrappedEdgeState();

  return (
    <WrappedNodeContext.Provider value={wrappedNodeState}>
      <WrappedEdgeContext.Provider value={wrappedEdgeState}>
        <FlowRenderArea onInit={setFlowInstance} />
        {/*       
      <AppContextMenu
        onClose={handleContextMenuClose}
        anchorPosition={contextMenuPos}
      /> */}
        {/* <Dialog
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
        </Dialog> */}
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
