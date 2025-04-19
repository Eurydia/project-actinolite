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
  multiplicityStart: string | undefined;
  multiplicityEnd: string | undefined;
  label: string | undefined;
  markerStart:
    | ValueOf<typeof DiagramEdgeMarkerType>
    | undefined;
  markerEnd:
    | ValueOf<typeof DiagramEdgeMarkerType>
    | undefined;
  lineType: ValueOf<typeof DiagramEdgeLineType>;
};

export type DiagramNodeData = {
  name: string;
  color: string;
  attributes: DiagramNodeAttributeData[];
  methods: DiagramNodeMethodData[];
};

export type DiagramNodeAttributeData = {
  id: number;
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};

export type DiagramNodeMethodData = {
  id: number;
  access_: ValueOf<typeof AccessLevel>;
  primary: string;
  secondary: string;
};
