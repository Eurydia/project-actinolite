import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import { createContext } from "react";

export const WrappedNodeContext = createContext<
  ReturnType<typeof useWrappedNodeState>
>({
  onNodeDataChange: () => {
    throw new Error();
  },
  onNodeAdd: () => {
    throw new Error();
  },
  onNodesChange: () => {
    throw new Error();
  },
  nodes: [],
  onNodesRestore: () => {
    throw new Error();
  },
  onNodeChangeMany: () => {
    throw new Error();
  },
});
