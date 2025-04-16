import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { AccessLevel } from "@/types/figure";
import { useCallback, useContext } from "react";

export const useNodeAttributeHandlers = (
  nodeId: string
) => {
  const { onAttributeAdd } = useContext(WrappedNodeContext);

  const handleAttributeAdd = useCallback(() => {
    onAttributeAdd(nodeId, {
      access_: AccessLevel.PRIVATE,
      primary: "",
      secondary: "",
    });
  }, [nodeId, onAttributeAdd]);
};
