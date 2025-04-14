import {
  DiagramEdgeData,
  DiagramEdgeLineType,
  DiagramEdgeMarkerType,
} from "@/types/figure";
import {
  DeleteRounded,
  SwapHorizRounded,
  TextDecreaseRounded,
  TextIncreaseRounded,
} from "@mui/icons-material";
import {
  alpha,
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
  useMemo,
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
import { StrictTextField } from "../StrictTextField";
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
export const TEXT_SHADOW = `#fff 3px 0px 0px, #fff 2.83487px 0.981584px 0px, #fff 2.35766px 1.85511px 0px, #fff 1.62091px 2.52441px 0px, #fff 0.705713px 2.91581px 0px, #fff -0.287171px 2.98622px 0px, #fff -1.24844px 2.72789px 0px, #fff -2.07227px 2.16926px 0px, #fff -2.66798px 1.37182px 0px, #fff -2.96998px 0.42336px 0px, #fff -2.94502px -0.571704px 0px, #fff -2.59586px -1.50383px 0px, #fff -1.96093px -2.27041px 0px, #fff -1.11013px -2.78704px 0px, #fff -0.137119px -2.99686px 0px, #fff 0.850987px -2.87677px 0px, #fff 1.74541px -2.43999px 0px, #fff 2.44769px -1.73459px 0px, #fff 2.88051px -0.838247px 0px`;

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

  const handleMarkerSwap = useCallback(() => {
    if (data === undefined) {
      return;
    }
    data.onMarkerEndChange(id, data.markerStart);
    data.onMarkerStartChange(id, data.markerEnd);
  }, [data, id]);

  const handleLineTypeChange = useCallback(
    (value: DiagramEdgeData["lineType"]) => {
      if (data === undefined) {
        return;
      }
      data.onLineTypeChange(id, value);
    },
    [data, id]
  );

  const handleDelete = useCallback(() => {
    if (data === undefined) {
      return;
    }
    data.onDelete(id);
  }, [data, id]);

  const handleLabelChange = useCallback(
    (value: string) => {
      if (data === undefined) {
        return;
      }
      data.onLabelChange(id, value);
    },
    [data, id]
  );

  const handleLabelToggle = useCallback(() => {
    if (data === undefined) {
      return;
    }
    data.onLabelChange(
      id,
      data.label === undefined ? "" : undefined
    );
  }, [data, id]);

  const hasLabel = useMemo(() => {
    return data !== undefined && data.label !== undefined;
  }, [data]);

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
            pointerEvents: "all",
          }}
        >
          <StrictTextField
            placeholder="unlabelled"
            value={data.label ?? ""}
            onTextChange={handleLabelChange}
            sx={{
              display: !hasLabel ? "none" : undefined,
              visibility: !hasLabel ? "hidden" : undefined,
              backgroundColor: alpha("#fff", 0.5),
              borderRadius: 1,
              padding: 1,
              textAlign: "center",
              maxWidth: 200,
              minWidth: 70,
            }}
          />
        </div>
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
            <Stack
              direction="row"
              spacing={1}
              divider={
                <Divider
                  flexItem
                  orientation="vertical"
                />
              }
            >
              <Stack direction="row">
                <MenuButton
                  value={data.markerStart ?? ""}
                  onChange={handleMarkerStartChange}
                  options={MARKER_START_OPTIONS}
                />
                <IconButton
                  disableRipple
                  onClick={handleMarkerSwap}
                >
                  <SwapHorizRounded />
                </IconButton>
                <MenuButton
                  value={data.markerEnd ?? ""}
                  onChange={handleMarkerEndChange}
                  options={MARKER_END_OPTIONS}
                />
              </Stack>
              <MenuButton
                value={data.lineType}
                onChange={handleLineTypeChange}
                options={lineTypeOptions}
              />
              <IconButton
                disableRipple
                onClick={handleLabelToggle}
                color="default"
              >
                {hasLabel && <TextDecreaseRounded />}
                {!hasLabel && <TextIncreaseRounded />}
              </IconButton>
              <IconButton
                disableRipple
                color="error"
                onClick={handleDelete}
              >
                <DeleteRounded />
              </IconButton>
            </Stack>
          </Toolbar>
        </Paper>
      </Popper>
    </Fragment>
  );
});
