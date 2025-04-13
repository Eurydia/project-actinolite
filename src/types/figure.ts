import { ValueOf } from "./generics";

export const AccessLevel = {
  PRIVATE: "-",
  PROTECTED: "#",
  PUBLIC: "+",
} as const;

export const MarkerType = {
  DIAMOND_FILLED: "marker-pdiamond-filled",
  DIAMOND_OUTLINE: "marker-diamond-outline",
  TRIANGLE_FILLED: "marker-triangle-outline",
  TRIANGLE_OUTLINE: "marker-triangle-outline",
  ARROW: "marker-arrow",
};

export type DiagramEdgeData = {
  label?: string | undefined;
  startMarker: string | undefined;
  endMarker: string | undefined;
  lineType: string;
  onLabelChange: (value: string | undefined) => void;
  onStartMarkerChange: (value: number) => void;
  onEndMarkerChange: (value: number) => number;
  onLineTypeChange: (value: number) => number;
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
