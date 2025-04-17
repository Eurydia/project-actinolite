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
  onDelete: (id: string) => void;
  onMultiplicityStartChange: (
    id: string,
    value: string | undefined
  ) => void;
  onMultiplicityEndChange: (
    id: string,
    value: string | undefined
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

// handlers: {
//   onAccessChange: (
//     classId: number,
//     id: number,
//     value: ValueOf<typeof AccessLevel>
//   ) => void;
//   onPrimaryChange: (
//     classId: number,
//     id: number,
//     value: string
//   ) => void;
//   onSecondaryChange: (
//     classId: number,
//     id: number,
//     value: string
//   ) => void;
//   onDuplicate: (classId: number, id: number) => void;
//   onDelete: (classId: number, id: number) => void;
// };
