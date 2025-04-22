import { useWrappedEdgeState } from "@/hooks/useWrappedEdgeState";
import { createContext } from "react";

export const WrappedEdgeContext = createContext<
  ReturnType<typeof useWrappedEdgeState>
>({
  edges: [],
  onEdgeAdd: () => {
    throw new Error();
  },
  onEdgeDataChange: () => {
    throw new Error();
  },
  onEdgeDelete: () => {
    throw new Error();
  },
  onEdgesChange: () => {
    throw new Error();
  },
  onEdgeChangeMany: () => {
    throw new Error();
  },
});
