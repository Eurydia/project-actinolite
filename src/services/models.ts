import {
  AccessLevel,
  DiagramClassMethod,
  ValueOf,
} from "@/types/figure";

let GLOBAL_METHOD_ID = 0;
export const newDiagramClassMethod = (init: {
  access_?: ValueOf<typeof AccessLevel>;
  primary?: string;
  secondary?: string;
}): DiagramClassMethod => {
  return {
    id: GLOBAL_METHOD_ID++,
    access_: init.access_ ?? AccessLevel.PRIVATE,
    primary: init.primary ?? "",
    secondary: init.secondary ?? "",
  };
};
