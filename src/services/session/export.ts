import {
  DiagramEdgeData,
  DiagramNodeData,
} from "@/types/figure";
import {
  Edge,
  Node,
  ReactFlowInstance,
} from "@xyflow/react";
import { saveAs } from "file-saver";

export const exportWorkspace = async (
  rInstance: ReactFlowInstance<
    Node<DiagramNodeData>,
    Edge<DiagramEdgeData>
  >
) => {
  const jsonString = JSON.stringify(rInstance.toObject());
  const now = new Date(Date.now());

  saveAs(
    new Blob([jsonString], { type: "application/json" }),
    `Exported ${now.toISOString()}.atnl`
  );
};
