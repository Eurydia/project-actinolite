import {
  Divider,
  Menu,
  Stack,
  Toolbar,
} from "@mui/material";
import {
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  SmoothStepEdge,
} from "@xyflow/react";
import { FC, memo, useRef, useState } from "react";
import {
  IoChevronBack,
  IoSquare,
  IoSquareOutline,
  IoTriangle,
  IoTriangleOutline,
} from "react-icons/io5";
import { MenuButton } from "../form/MenuButton";

export const StyledEdge: FC<EdgeProps> = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    selected,
    markerEnd,
    markerStart,
  }) => {
    const [, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    });

    const fabRef = useRef<HTMLDivElement>(null);
    const [startMarker, setStartMarker] = useState(0);

    return (
      <>
        <SmoothStepEdge
          markerEnd={markerEnd}
          markerStart={markerStart}
          id={id}
          sourceX={sourceX}
          sourceY={sourceY}
          targetX={targetX}
          targetY={targetY}
          sourcePosition={sourcePosition}
          targetPosition={targetPosition}
          interactionWidth={4}
        />
        <EdgeLabelRenderer>
          <div ref={fabRef} />
        </EdgeLabelRenderer>
        <Menu
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          open={!!selected}
          anchorPosition={{
            left: labelX,
            top: labelY,
          }}
          anchorReference="anchorPosition"
        >
          <Toolbar variant="dense">
            <Stack
              direction="row"
              divider={
                <Divider
                  flexItem
                  orientation="vertical"
                />
              }
            >
              <MenuButton
                options={[
                  "None",
                  <IoTriangle
                    style={{
                      transform: "rotate(-90deg)",
                    }}
                  />,
                  <IoTriangleOutline
                    style={{
                      transform: "rotate(-90deg)",
                    }}
                  />,
                  <IoSquare
                    style={{
                      transform: "rotate(45deg)",
                    }}
                  />,
                  <IoSquareOutline
                    style={{
                      transform: "rotate(45deg)",
                    }}
                  />,
                  <IoChevronBack />,
                ]}
                value={startMarker}
                onChange={setStartMarker}
              />
            </Stack>
          </Toolbar>
        </Menu>
      </>
    );
  }
);
