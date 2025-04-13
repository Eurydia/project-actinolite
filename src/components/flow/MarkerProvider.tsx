import { DiagramEdgeMarkerType } from "@/types/figure";
import { FC } from "react";

export const MarkerProvider: FC = () => {
  return (
    <svg
      style={{ position: "absolute", top: 0, left: 0 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id={DiagramEdgeMarkerType.DIAMOND_OUTLINE}
          viewBox="0 0 50 50"
          refX="48"
          refY="25"
          markerWidth="48"
          markerHeight="48"
          orient="auto-start-reverse"
        >
          <polygon
            stroke="context-stroke"
            fill="white"
            fillRule="nonzero"
            opacity="1"
            vectorEffect="non-scaling-stroke"
            points="25,0 50,25 25,50 0,25"
          />
        </marker>
        <marker
          id={DiagramEdgeMarkerType.DIAMOND_FILLED}
          viewBox="0 0 50 50"
          refX="48"
          refY="25"
          markerWidth="48"
          markerHeight="48"
          orient="auto-start-reverse"
        >
          <polygon
            fill="context-stroke"
            fillRule="nonzero"
            opacity="1"
            vectorEffect="non-scaling-stroke"
            points="25,0 50,25 25,50 0,25"
          />
        </marker>
        <marker
          id={DiagramEdgeMarkerType.TRIANGLE_OUTLINE}
          viewBox="0 0 50 50"
          refX="45"
          refY="25"
          markerWidth="48"
          markerHeight="48"
          orient="auto-start-reverse"
        >
          <polygon
            stroke="context-stroke"
            fill="white"
            fillRule="nonzero"
            opacity="1"
            vectorEffect="non-scaling-stroke"
            points="1,1 49,24 1,49 1,1"
          />
        </marker>
        <marker
          id={DiagramEdgeMarkerType.TRIANGLE_FILLED}
          viewBox="0 0 50 50"
          refX="45"
          refY="25"
          markerWidth="48"
          markerHeight="48"
          orient="auto-start-reverse"
        >
          <polygon
            fill="context-stroke"
            fillRule="nonzero"
            opacity="1"
            vectorEffect="non-scaling-stroke"
            points="1,1 49,24 1,49 1,1"
          />
        </marker>
        <marker
          id={DiagramEdgeMarkerType.ARROW}
          markerWidth="48"
          markerHeight="48"
          viewBox="0 0 50 50"
          orient="auto-start-reverse"
          refX="50"
          refY="25"
        >
          <path
            d="M 0 0 L 50 25 L 0 50"
            stroke="context-stroke"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </marker>
      </defs>
    </svg>
  );
};
