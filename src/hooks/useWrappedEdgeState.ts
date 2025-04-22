import {
  DiagramEdgeData,
  DiagramEdgeLineType,
} from "@/types/figure";
import { Edge, useEdgesState } from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";

export const createEdge = (
  source: string,
  target: string
): Edge<DiagramEdgeData> => {
  return {
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
        return prev.concat(createEdge(source, target));
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
    onEdgeChangeMany,
  };
};
