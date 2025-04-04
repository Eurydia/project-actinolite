import { DiagramClass } from "@/types/figure";
import {
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NodeResizer } from "@xyflow/react";
import { FC, memo } from "react";
import { ClassAttributeItem } from "./ClassAttributeItem";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { MethodRegion } from "./MethodRegion";
import { MethodItem } from "./MethodRegionItem";

type Props = {
  data: DiagramClass;
  selected: boolean;
};
export const ClassNode: FC<Props> = memo(
  ({ data, selected }) => {
    return (
      <>
        <NodeResizer
          isVisible={selected}
          minWidth={400}
        />
        {/* <Handle
          type="target"
          position={Position.Top}
        />
        <Handle
          type="source"
          position={Position.Bottom}
        /> */}
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: ({ palette }) =>
              palette.background.paper,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              backgroundColor: "pink",
              fontFamily: "monospace",
              fontWeight: 900,
              padding: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data.name}
          </Typography>
          <Stack
            spacing={1}
            divider={<Divider variant="middle" />}
            sx={{
              height: "85%",
              overflow: "auto",
              scrollbarWidth: "thin",
            }}
          >
            <ClassAttributeRegion
              id={data.name + "-attrs-region"}
            >
              {data.attributes.map((attr, index) => (
                <ClassAttributeItem
                  group={data.name}
                  key={data.name + "attrs" + index}
                  id={data.name + "attrs" + index}
                  index={index}
                  data={attr}
                />
              ))}
            </ClassAttributeRegion>
            <MethodRegion id={data.name + "-method-region"}>
              {data.methods.map((method, index) => (
                <MethodItem
                  group={data.name}
                  key={data.name + "method" + index}
                  id={data.name + "method" + index}
                  index={index}
                  data={method}
                />
              ))}
            </MethodRegion>
          </Stack>
        </Paper>
      </>
    );
  }
);
