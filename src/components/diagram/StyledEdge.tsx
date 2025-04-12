import {
  DeleteRounded,
  SwapHorizRounded,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
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
  IoChevronForward,
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
    const [endMarker, setEndMarker] = useState(0);
    const [lineType, setLineType] = useState(0);

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
          <Toolbar
            variant="dense"
            disableGutters
            sx={{ gap: 1, padding: 1 }}
          >
            <Stack
              spacing={1}
              direction="row"
            >
              <MenuButton
                value={startMarker}
                onChange={setStartMarker}
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
              />
              <IconButton>
                <SwapHorizRounded />
              </IconButton>
              <MenuButton
                value={endMarker}
                onChange={setEndMarker}
                options={[
                  "None",
                  <IoTriangle
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  />,
                  <IoTriangleOutline
                    style={{
                      transform: "rotate(90deg)",
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
                  <IoChevronForward />,
                ]}
              />
            </Stack>
            <Divider
              flexItem
              orientation="vertical"
            />
            <MenuButton
              value={lineType}
              onChange={setLineType}
              options={["Solid", "Dashed"]}
            />
            <Divider
              flexItem
              orientation="vertical"
            />
            <IconButton color="error">
              <DeleteRounded />
            </IconButton>
          </Toolbar>
        </Menu>
      </>
    );
  }
);
