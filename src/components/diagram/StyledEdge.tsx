import {
  DiagramEdgeData,
  DiagramEdgeLineType,
  DiagramEdgeMarkerType,
} from "@/types/figure";
import {
  DeleteRounded,
  SwapHorizRounded,
} from "@mui/icons-material";
import {
  Divider,
  IconButton,
  Paper,
  Popper,
  Stack,
  Toolbar,
} from "@mui/material";
import {
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  SmoothStepEdge,
} from "@xyflow/react";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useRef,
} from "react";
import {
  IoChevronBack,
  IoChevronForward,
  IoSquare,
  IoSquareOutline,
  IoTriangle,
  IoTriangleOutline,
} from "react-icons/io5";
import { MenuButton } from "../form/MenuButton";
const lineTypeOptions = [
  {
    label: "Solid",
    value: DiagramEdgeLineType.SOLID,
  },
  {
    label: "Dashed",
    value: DiagramEdgeLineType.DASHED,
  },
];

const MARKER_START_OPTIONS = [
  { label: "None", value: "" },
  {
    label: (
      <IoTriangle
        style={{
          transform: "rotate(-90deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.TRIANGLE_FILLED,
  },
  {
    label: (
      <IoTriangleOutline
        style={{
          transform: "rotate(-90deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.TRIANGLE_OUTLINE,
  },
  {
    label: (
      <IoSquare
        style={{
          transform: "rotate(45deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.DIAMOND_FILLED,
  },
  {
    label: (
      <IoSquareOutline
        style={{
          transform: "rotate(45deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.DIAMOND_OUTLINE,
  },
  {
    label: <IoChevronBack />,
    value: DiagramEdgeMarkerType.ARROW,
  },
];

const MARKER_END_OPTIONS = [
  { label: "None", value: "" },
  {
    label: (
      <IoTriangle
        style={{
          transform: "rotate(90deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.TRIANGLE_FILLED,
  },
  {
    label: (
      <IoTriangleOutline
        style={{
          transform: "rotate(90deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.TRIANGLE_OUTLINE,
  },
  {
    label: (
      <IoSquare
        style={{
          transform: "rotate(45deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.DIAMOND_FILLED,
  },
  {
    label: (
      <IoSquareOutline
        style={{
          transform: "rotate(45deg)",
        }}
      />
    ),
    value: DiagramEdgeMarkerType.DIAMOND_OUTLINE,
  },
  {
    label: <IoChevronForward />,
    value: DiagramEdgeMarkerType.ARROW,
  },
];

export const StyledEdge: FC<
  EdgeProps<Edge<DiagramEdgeData>>
> = memo(({ id, selected, data, ...rest }) => {
  const [, labelX, labelY] = getSmoothStepPath(rest);

  const fabRef = useRef<HTMLDivElement>(null);

  const handleMarkerStartChange = useCallback(
    (value: DiagramEdgeData["markerStart"]) => {
      if (data === undefined) {
        return;
      }
      data.onMarkerStartChange(
        id,
        value === "" ? undefined : value
      );
    },
    [data, id]
  );

  const handleMarkerEndChange = useCallback(
    (value: DiagramEdgeData["markerEnd"]) => {
      if (data === undefined) {
        return;
      }
      data.onMarkerEndChange(
        id,
        value === "" ? undefined : value
      );
    },
    [data, id]
  );

  const handleLineTypeChange = useCallback(
    (value: DiagramEdgeData["lineType"]) => {
      if (data === undefined) {
        return;
      }
      data.onLineTypeChange(id, value);
    },
    [data, id]
  );

  if (data === undefined) {
    return null;
  }

  return (
    <Fragment>
      <SmoothStepEdge
        id={id}
        {...rest}
      />
      <EdgeLabelRenderer>
        <div
          ref={fabRef}
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        ></div>
      </EdgeLabelRenderer>
      <Popper
        anchorEl={fabRef.current}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        open={!!selected}
        placement="top"
      >
        <Paper sx={{ padding: 1 }}>
          <Toolbar
            variant="dense"
            disableGutters
          >
            <Stack direction="row">
              <MenuButton
                value={data.markerStart ?? ""}
                onChange={handleMarkerStartChange}
                options={MARKER_START_OPTIONS}
              />
              <IconButton>
                <SwapHorizRounded />
              </IconButton>
              <MenuButton
                value={data.markerEnd ?? ""}
                onChange={handleMarkerEndChange}
                options={MARKER_END_OPTIONS}
              />
            </Stack>
            <Divider
              flexItem
              orientation="vertical"
            />
            <MenuButton
              value={data.lineType}
              onChange={handleLineTypeChange}
              options={lineTypeOptions}
            />
            <Divider
              flexItem
              orientation="vertical"
            />
            <IconButton color="error">
              <DeleteRounded />
            </IconButton>
          </Toolbar>
        </Paper>
      </Popper>
    </Fragment>
  );
});
