import {
  DiagramClassAttribute,
  DiagramClassMethod,
} from "@/types/figure";

let GLOBAL_METHOD_ID = 0;
export const createDiagramClassMethod = (
  value: Omit<DiagramClassMethod, "id">
): DiagramClassMethod => {
  return {
    id: GLOBAL_METHOD_ID++,
    access_: value.access_,
    primary: value.primary,
    secondary: value.secondary,
  };
};

let GLOBAL_ATTRIBUTE_ID = 0;
export const createClassAttribute = (
  init: Omit<DiagramClassAttribute, "id">
): DiagramClassAttribute => {
  return {
    id: GLOBAL_ATTRIBUTE_ID++,
    access_: init.access_,
    primary: init.primary,
    secondary: init.secondary,
  };
};
