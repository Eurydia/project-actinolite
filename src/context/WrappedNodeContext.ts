import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import { createContext } from "react";

export const WrappedNodeContext = createContext<
  ReturnType<typeof useWrappedNodeState>
>({
  onNodeAttributesChange: () => {
    throw new Error();
  },
  onNodeMethodsChange: () => {
    throw new Error();
  },
  onNodeAdd: () => {
    throw new Error();
  },
  onNodesChange: () => {
    throw new Error();
  },
  nodes: [],
});
