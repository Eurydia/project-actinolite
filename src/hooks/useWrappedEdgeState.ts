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
          onLabelChange: handleEdgeLabelChange,
          onMarkerStartChange: handleEdgeStartMarkerChange,
          onMarkerEndChange: handleEdgeEndMarkerChange,
          onLineTypeChange: handleEdgeLineTypeChange,
          markerStart: undefined,
          markerEnd: undefined,
        },
        style: { strokeWidth: 2 },
      };
    },
    [
      handleEdgeEndMarkerChange,
      handleEdgeLabelChange,
      handleEdgeLineTypeChange,
      handleEdgeStartMarkerChange,
    ]
  );

  return {
    edges,
    setEdges,
    onEdgesChange,
    createNewEdge,
  };
};
