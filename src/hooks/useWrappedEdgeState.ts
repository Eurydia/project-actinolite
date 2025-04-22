import {
  DiagramEdgeData,
  DiagramEdgeLineType,
} from "@/types/figure";
import { Edge, useEdgesState } from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";

export const createEdge = (
  source: string,
  target: string,
  sourceHandle: string,
  targetHandle: string
): Edge<DiagramEdgeData> => {
  return {
    id: `${source}-${target}`,
    source,
    sourceHandle,
    targetHandle,
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
  };
};

export const useWrappedEdgeState = () => {
  const init = useMemo(() => {
    const saved = localStorage.getItem(
      "actinolite-autosave-edges"
    );
    if (saved === null) {
      return [];
    }
    try {
      return JSON.parse(saved) as Edge<DiagramEdgeData>[];
    } catch {
      localStorage.removeItem("actinolite-autosave-edges");
      return [];
    }
  }, []);

  const [edges, onEdgesChange, onEdgeChangeMany] =
    useEdgesState<Edge<DiagramEdgeData>>([]);

  useEffect(() => {
    localStorage.setItem(
      "actinolite-autosave-edges",
      JSON.stringify(edges)
    );
  }, [edges]);

  useEffect(() => {
    onEdgesChange(init);
  }, [init, onEdgesChange]);

  const onEdgeDataChange = useCallback(
    (id: string, value: DiagramEdgeData) => {
      onEdgesChange((prev) => {
        return prev.map((edge) => {
          if (edge.id !== id) {
            return edge;
          }
          const nextEdge = structuredClone(edge);
          nextEdge.data = value;
          return nextEdge;
        });
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

  return {
    edges,
    onEdgeDataChange,
    onEdgeDelete,
    onEdgesChange,
    onEdgeChangeMany,
  };
};
