import {
  DiagramEdgeData,
  DiagramEdgeLineType,
} from "@/types/figure";
import { Edge, useEdgesState } from "@xyflow/react";
import { useCallback } from "react";

export const useWrappedEdgeState = () => {
  const [edges, onEdgesChange] = useEdgesState<
    Edge<DiagramEdgeData>
  >([]);

  const onEdgeChange = useCallback(
    (value: Edge<DiagramEdgeData>) => {
      onEdgesChange((prev) => {
        return prev.map((edge) =>
          edge.id === value.id ? value : edge
        );
      });
    },
    [onEdgesChange]
  );

  const onEdgeDelete = useCallback(
    (id: string) => {
      onEdgesChange((prev) => {
        return prev.filter((edge) => edge.id !== id);
      });
    },
    [onEdgesChange]
  );

  const onEdgeAdd = useCallback(
    (source: string, target: string) => {
      onEdgesChange((prev) => {
        return prev.concat({
          id: `${source}-${target}`,
          source,
          target,
          data: {
            lineType: DiagramEdgeLineType.SOLID,
            markerStart: undefined,
            markerEnd: undefined,
            multiplicityEnd: undefined,
            multiplicityStart: undefined,
            label: undefined,
          },
          style: { strokeWidth: 2 },
        });
      });
    },
    [onEdgesChange]
  );

  return {
    edges,
    onEdgeChange,
    onEdgeDelete,
    onEdgeAdd,
    onEdgesChange,
  };
};
