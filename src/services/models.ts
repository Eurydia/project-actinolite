import {
  DiagramNodeAttributeData,
  DiagramNodeMethodData,
} from "@/types/figure";

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

let GLOBAL_ATTRIBUTE_ID = 0;
export const createDiagramNodeAttributeData = (
  init: Omit<DiagramNodeAttributeData, "id">
): DiagramNodeAttributeData => {
  return {
    id: GLOBAL_ATTRIBUTE_ID++,
    access_: init.access_,
    primary: init.primary,
    secondary: init.secondary,
  };
};
