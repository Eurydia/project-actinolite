import {
  DiagramEdgeData,
  DiagramEdgeLineType,
  DiagramEdgeMarkerType,
} from "@/types/figure";
import { ValueOf } from "@/types/generics";
import { Edge, useEdgesState } from "@xyflow/react";
import { useCallback } from "react";

const findEdgeWithId = (
  id: string,
  edges: Edge<DiagramEdgeData>[]
) => {
  return edges.findIndex((edge) => edge.id === id);
};
export const useWrappedEdgeState = () => {
  const [edges, setEdges, onEdgesChange] = useEdgesState<
    Edge<DiagramEdgeData>
  >([]);

  const handleEdgeLabelChange = useCallback(
    (id: string, value: string | undefined) => {
      setEdges((prev) => {
        const edgeIndex = findEdgeWithId(id, prev);

        const next: typeof prev = prev.map(
          (edge, index) => {
            if (index !== edgeIndex) {
              return edge;
            }
            const { data, ...rest } = edge;
            return {
              ...rest,
              data: {
                ...data!,
                label: value,
              },
            };
          }
        );

        return next;
      });
    },
    [setEdges]
  );

  const handleEdgeLineTypeChange = useCallback(
    (id: string, value: DiagramEdgeData["lineType"]) => {
      setEdges((prev) => {
        const edgeIndex = findEdgeWithId(id, prev);

        const next: typeof prev = prev.map(
          (edge, index) => {
            if (index !== edgeIndex) {
              return edge;
            }

            const strokeDasharray =
              value === DiagramEdgeLineType.DASHED
                ? "16"
                : "none";

            const { style, data, ...rest } = edge;
            return {
              ...rest,
              data: {
                ...data!,
                lineType: value,
              },
              style: {
                ...style,
                strokeDasharray,
              },
            };
          }
        );

        return next;
      });
    },
    [setEdges]
  );

  const handleEdgeStartMarkerChange = useCallback(
    (
      id: string,
      value:
        | ValueOf<typeof DiagramEdgeMarkerType>
        | undefined
    ) => {
      setEdges((prev) => {
        const edgeIndex = findEdgeWithId(id, prev);
        const next: typeof prev = prev.map(
          (edge, index) => {
            if (index !== edgeIndex) {
              return edge;
            }

            const { data, ...rest } = edge;
            return {
              ...rest,
              data: {
                ...data!,
                markerStart: value,
              },
              markerStart: value,
            };
          }
        );

        return next;
      });
    },
    [setEdges]
  );

  const handleEdgeEndMarkerChange = useCallback(
    (
      id: string,
      value:
        | ValueOf<typeof DiagramEdgeMarkerType>
        | undefined
    ) => {
      setEdges((prev) => {
        const edgeIndex = findEdgeWithId(id, prev);
        const next: typeof prev = prev.map(
          (edge, index) => {
            if (index !== edgeIndex) {
              return edge;
            }
            const { data, ...rest } = edge;
            return {
              ...rest,
              data: {
                ...data!,
                markerEnd: value,
              },
              markerEnd: value,
            };
          }
        );
        return next;
      });
    },
    [setEdges]
  );

  const handleMultiplicityStartChange = useCallback(
    (id: string, value: string | undefined) => {
      setEdges((prev) => {
        const next: typeof prev = [];
        for (const edge of prev) {
          if (edge.id !== id) {
            next.push(edge);
            continue;
          }
          const { data, ...rest } = edge;
          const nextEdge: typeof edge = {
            ...rest,
            data: {
              ...data!,
              multiplicityStart: value,
            },
          };
          next.push(nextEdge);
        }
        return next;
      });
    },
    [setEdges]
  );

  const handleMultiplicityEndChange = useCallback(
    (id: string, value: string | undefined) => {
      setEdges((prev) => {
        const next: typeof prev = [];
        for (const edge of prev) {
          if (edge.id !== id) {
            next.push(edge);
            continue;
          }
          const { data, ...rest } = edge;
          const nextEdge: typeof edge = {
            ...rest,
            data: {
              ...data!,
              multiplicityEnd: value,
            },
          };
          next.push(nextEdge);
        }
        return next;
      });
    },
    [setEdges]
  );

  const handleEdgeDelete = useCallback(
    (id: string) => {
      setEdges((prev) => {
        return prev.filter((edge) => edge.id !== id);
      });
    },
    [setEdges]
  );

  const createNewEdge = useCallback(
    (
      source: string,
      target: string
    ): Edge<DiagramEdgeData> => {
      const id = `${source}-${target}`;
      return {
        id,
        source,
        target,
        data: {
          lineType: DiagramEdgeLineType.SOLID,
          markerStart: undefined,
          markerEnd: undefined,
          multiplicityEnd: undefined,
          multiplicityStart: undefined,
          label: undefined,
          onLabelChange: handleEdgeLabelChange,
          onMarkerStartChange: handleEdgeStartMarkerChange,
          onMarkerEndChange: handleEdgeEndMarkerChange,
          onLineTypeChange: handleEdgeLineTypeChange,
          onDelete: handleEdgeDelete,
          onMultiplicityEndChange:
            handleMultiplicityEndChange,
          onMultiplicityStartChange:
            handleMultiplicityStartChange,
        },
        style: { strokeWidth: 2 },
      };
    },
    [
      handleEdgeDelete,
      handleEdgeEndMarkerChange,
      handleEdgeLabelChange,
      handleEdgeLineTypeChange,
      handleEdgeStartMarkerChange,
      handleMultiplicityEndChange,
      handleMultiplicityStartChange,
    ]
  );

  return {
    edges,
    setEdges,
    onEdgesChange,
    createNewEdge,
  };
};
