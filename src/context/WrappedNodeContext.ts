import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import { createContext } from "react";

export const WrappedNodeContext = createContext<
  Omit<
    ReturnType<typeof useWrappedNodeState>,
    "nodes" | "onNodesChange"
  >
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
});
