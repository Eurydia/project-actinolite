import { ValueOf } from "./generics";

export const AccessLevel = {
  PRIVATE: "-",
  PROTECTED: "#",
  PUBLIC: "+",
} as const;

export const DiagramEdgeMarkerType = {
  DIAMOND_FILLED: "marker-pdiamond-filled",
  DIAMOND_OUTLINE: "marker-diamond-outline",
  TRIANGLE_FILLED: "marker-triangle-filled",
  TRIANGLE_OUTLINE: "marker-triangle-outline",
  ARROW: "marker-arrow",
};

export const DiagramEdgeLineType = {
  DASHED: "dashed",
  SOLID: "solid",
};

export type DiagramEdgeData = {
  label?: string | undefined;
  markerStart:
    | ValueOf<typeof DiagramEdgeMarkerType>
    | undefined;
  markerEnd:
    | ValueOf<typeof DiagramEdgeMarkerType>
    | undefined;
  lineType: ValueOf<typeof DiagramEdgeLineType>;
  onLabelChange: (
    id: string,
    value: string | undefined
  ) => void;
  onMarkerStartChange: (
    id: string,
    value: ValueOf<typeof DiagramEdgeMarkerType> | undefined
  ) => void;
  onMarkerEndChange: (
    id: string,
    value: ValueOf<typeof DiagramEdgeMarkerType> | undefined
  ) => void;
  onLineTypeChange: (
    id: string,
    value: ValueOf<typeof DiagramEdgeLineType>
  ) => void;
};

export type DiagramNodeData = {
  name: string;
  attributes: DiagramClassAttribute[];
  methods: DiagramClassMethod[];
};

export type DiagramClassAttribute = {
  id: number;
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};

export type DiagramClassMethod = {
  id: number;
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};
