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

const compressStream = async (data: string) => {
  const stream = new Blob([data], {
    type: "text/plain",
  }).stream();

  const compressedStream = stream.pipeThrough(
    new CompressionStream("gzip")
  );

  const compressedChunks: Uint8Array<ArrayBufferLike>[] =
    [];
  const reader = compressedStream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    compressedChunks.push(value);
  }

  return new Blob(compressedChunks, {
    type: "application/gzip",
  });
};

export const exportWorkspace = async (
  rInstance: ReactFlowInstance<
    Node<DiagramNodeData>,
    Edge<DiagramEdgeData>
  >
) => {
  const jsonString = JSON.stringify(rInstance.toObject());
  const now = new Date(Date.now());

  const compressed = await compressStream(jsonString);
  saveAs(compressed, `Exported ${now.toISOString()}.atnl`);
};
