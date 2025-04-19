import { exportWorkspace } from "@/services/session/export";
import {
  DiagramEdgeData,
  DiagramNodeData,
} from "@/types/figure";
import {
  Edge,
  Node,
  ReactFlowInstance,
} from "@xyflow/react";
import { useCallback, useState } from "react";

export const useHandleExportSession = () => {
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

  return;
};
