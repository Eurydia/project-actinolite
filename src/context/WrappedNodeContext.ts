import { DiagramClassAttribute } from "@/types/figure";
import { createContext } from "react";

export const WrappedNodeContext = createContext<{
  onAttributeAdd: (
    nodeId: string,
    value: Omit<DiagramClassAttribute, "id">
  ) => void;
  onAttributeChange: (
    nodeId: string,
    value: DiagramClassAttribute
  ) => void;
  onAttributeRemove: (
    nodeId: string,
    attrId: number
  ) => void;
}>({
  onAttributeAdd: function (): void {
    throw new Error("Function not implemented.");
  },
  onAttributeChange: function (): void {
    throw new Error("Function not implemented.");
  },
  onAttributeRemove: function (): void {
    throw new Error("Function not implemented.");
  },
});
