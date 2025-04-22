import { FlowRenderArea } from "@/components/flow/FlowRenderArea";
import { StyledContextMenu } from "@/components/form/StyledContextMenu";
import { WrappedEdgeContext } from "@/context/WrappedEdgeContext";
import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useExportMedia } from "@/hooks/useExportMedia";
import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  ListItemText,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import { ReactFlowProvider } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { ToastContainer } from "react-toastify";

export const App = () => {
  const wrappedNodeState = useWrappedNodeState();
  const wrappedEdgeState = useWrappedEdgeState();
  const {
    contextMenuPos,
    onContextMenuClose,
    onContextMenuOpen,
  } = useContextMenu();

  const { exportAsJepg, exportAsPng, exportAsSvg } =
    useExportMedia();

  const handleNodeAdd = useCallback(() => {
    if (contextMenuPos === undefined) {
      return;
    }
    wrappedNodeState.onNodeAdd(contextMenuPos);
  }, [contextMenuPos, wrappedNodeState]);

  return (
    <WrappedNodeContext.Provider value={wrappedNodeState}>
      <WrappedEdgeContext.Provider value={wrappedEdgeState}>
        <Box
          sx={{ width: "100%", height: "100%" }}
          component="div"
          onContextMenu={onContextMenuOpen}
        >
          <FlowRenderArea />
        </Box>
        <StyledContextMenu
          closeOnSelect
          anchorPosition={contextMenuPos}
          onClose={onContextMenuClose}
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
          <MenuItem onClick={exportAsPng}>
            <ListItemText
              inset
              slotProps={{
                primary: { fontFamily: "monospace" },
              }}
            >
              Export as PNG
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={exportAsJepg}>
            <ListItemText
              inset
              slotProps={{
                primary: { fontFamily: "monospace" },
              }}
            >
              Export as JPEG
            </ListItemText>
          </MenuItem>
          <MenuItem onClick={exportAsSvg}>
            <ListItemText
              inset
              slotProps={{
                primary: { fontFamily: "monospace" },
              }}
            >
              Export as SVG
            </ListItemText>
          </MenuItem>
        </StyledContextMenu>
      </WrappedEdgeContext.Provider>
    </WrappedNodeContext.Provider>
  );
};

const theme = createTheme({
  typography: { fontFamily: "monospace" },
});
// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  return (
    <div style={{ height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactFlowProvider>
          <ToastContainer />
          <App />
        </ReactFlowProvider>
      </ThemeProvider>
    </div>
  );
};
