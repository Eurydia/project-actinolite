import { DiagramNodeMethodData } from "@/types/figure";

let GLOBAL_METHOD_ID = 0;
export const createDiagramNodeMethodData = (
  value: Omit<DiagramNodeMethodData, "id">
): DiagramNodeMethodData => {
  return {
    id: GLOBAL_METHOD_ID++,
    access_: value.access_,
    primary: value.primary,
    secondary: value.secondary,
  };
};
