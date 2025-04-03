import { createClassAttributes } from "@/services/gen";
import { DiagramClass } from "@/types/figure";
import { Paper, Stack, Typography } from "@mui/material";
import {
  Handle,
  NodeResizer,
  Position,
} from "@xyflow/react";
import { FC, useMemo } from "react";
import { ClassAttributeItem } from "./ClassAttributeItem";
import { ClassAttributeRegion } from "./ClassAttributeRegion";

type Props = {
  data: DiagramClass;
  selected: boolean;
};
export const ClassNode: FC<Props> = ({
  data,
  selected,
}) => {
  const attrs = useMemo(() => {
    return createClassAttributes(5);
  }, []);
  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={100}
        minHeight={30}
      />
      <Handle
        type="target"
        position={Position.Top}
      />
      <Paper variant="outlined">
        <Stack spacing={1}>
          <Typography
            className="handle"
            sx={{
              backgroundColor: "pink",
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 900,
              padding: 1,
            }}
          >
            {data.className}
          </Typography>

          <ClassAttributeRegion
            id={data.className + "-attrs-region"}
          >
            {attrs.map((attr, index) => (
              <ClassAttributeItem
                group={data.className}
                key={data.className + "attrs" + index}
                id={data.className + "attrs" + index}
                index={index}
                data={attr}
              />
            ))}
          </ClassAttributeRegion>
        </Stack>
      </Paper>
      <Handle
        type="source"
        position={Position.Top}
      />
    </>
  );
};
