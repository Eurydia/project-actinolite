import {
  AccessLevel,
  DiagramClassAttribute,
  DiagramClassMethod,
} from "@/types/figure";

let GLOBAL_METHOD_ID = 0;
export const createClassMethod = (
  init: Partial<Omit<DiagramClassMethod, "id">>
): DiagramClassMethod => {
  return {
    id: GLOBAL_METHOD_ID++,
    access_: init.access_ ?? AccessLevel.PRIVATE,
    primary: init.primary ?? "",
    secondary: init.secondary ?? "",
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
