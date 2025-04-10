import { MoreHorizRounded } from "@mui/icons-material";
import {
  Divider,
  Fab,
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
import {
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";

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

    const fabRef = useRef<HTMLButtonElement | null>(null);
    const [contextMenuOpen, setContextMenuOpen] =
      useState(false);
    const handleContextMenuOpen = useCallback(() => {
      setContextMenuOpen(true);
    }, []);

    const handleContextMenuClose = useCallback(() => {
      setContextMenuOpen(false);
    }, []);

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
          <Fab
            size="small"
            ref={fabRef}
            onClick={handleContextMenuOpen}
            sx={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
              display: !selected ? "none" : undefined,
            }}
          >
            <MoreHorizRounded />
          </Fab>
        </EdgeLabelRenderer>
        <Menu
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          open={contextMenuOpen}
          onClose={handleContextMenuClose}
          onClick={handleContextMenuClose}
          anchorEl={fabRef.current}
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
            ></Stack>
          </Toolbar>
          {/* {[
            <svg
              height="50"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0"
                y1="25"
                x2="100"
                y2="25"
                stroke="black"
                strokeWidth="2"
              />
            </svg>,
            <svg
              height="50"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="arrow-filled"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 10 0 L 0 5 L 10 10 z"
                    fill="black"
                  />
                </marker>
              </defs>
              <line
                x1="25"
                y1="25"
                x2="100"
                y2="25"
                stroke="black"
                strokeWidth="2"
                markerStart="url(#arrow-filled)"
              />
            </svg>,
            <svg
              height="50"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 10 0 L 0 5 M 10 10 L 0 5 M 0 5 L 10 5"
                    stroke="black"
                  />
                </marker>
              </defs>
              <line
                x1="25"
                y1="25"
                x2="100"
                y2="25"
                stroke="black"
                strokeWidth="2"
                markerStart="url(#arrow)"
              />
            </svg>,
            <svg
              height="50"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="diamond-filled"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 5 0 L 10 5 L 5 10 L 0 5 L 5 0 z"
                    fill="black"
                  />
                </marker>
              </defs>
              <line
                x1="25"
                y1="25"
                x2="100"
                y2="25"
                stroke="black"
                strokeWidth="2"
                markerStart="url(#diamond-filled)"
              />
            </svg>,
            <svg
              height="50"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <marker
                  id="diamond"
                  markerWidth="10"
                  markerHeight="10"
                  refX="10"
                  refY="5"
                  orient="auto"
                >
                  <path
                    d="M 5 0 L 10 5 
                      M 10 5 L 5 10
                      M 5 10 L 0 5
                      M 0 5 L 5 0"
                    stroke="black"
                  />
                </marker>
              </defs>
              <line
                x1="25"
                y1="25"
                x2="100"
                y2="25"
                stroke="black"
                strokeWidth="2"
                markerStart="url(#diamond)"
              />
            </svg>,
          ].map((value, index) => {
            return (
              <MenuItem key={`item${index}`}>
                {value}
              </MenuItem>
            );
          })} */}
          {/* <Divider /> */}
        </Menu>
      </>
    );
  }
);
