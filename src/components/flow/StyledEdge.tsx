import { WrappedEdgeContext } from "@/context/WrappedEdgeContext";
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
  Divider,
  IconButton,
  Paper,
  Popper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
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
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
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
import { StrictTextField } from "../form/StrictTextField";

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
  const { onEdgeDataChange, onEdgeDelete } = useContext(
    WrappedEdgeContext
  );

  const [mulStart, setMulStart] = useState<string>();
  const [mulEnd, setMulEnd] = useState<string>();
  const [label, setLabel] = useState<string>();
  const [markerStart, setMarkerStart] = useState(
    data === undefined ? undefined : data.markerStart
  );
  const [markerEnd, setMarkerEnd] = useState(
    data === undefined ? undefined : data.markerEnd
  );
  const [lineType, setLineType] = useState(
    data === undefined
      ? DiagramEdgeLineType.SOLID
      : data.lineType
  );

  useEffect(() => {
    onEdgeDataChange(id, {
      multiplicityStart: mulStart,
      multiplicityEnd: mulEnd,
      label,
      markerStart,
      markerEnd,
      lineType,
    });
  }, [
    id,
    label,
    lineType,
    markerEnd,
    markerStart,
    mulEnd,
    mulStart,
    onEdgeDataChange,
  ]);

  const fabRef = useRef<HTMLDivElement>(null);

  const handleMarkerSwap = useCallback(() => {
    const _markerStart = markerStart;
    setMarkerStart(markerEnd);
    setMarkerEnd(_markerStart);
  }, [markerEnd, markerStart]);

  const handleDelete = useCallback(() => {
    onEdgeDelete(id);
  }, [id, onEdgeDelete]);

  const handleLabelToggle = useCallback(() => {
    setLabel((prev) =>
      prev === undefined ? "" : undefined
    );
  }, []);

  const handleMulEndToggle = useCallback(() => {
    setMulEnd((prev) =>
      prev === undefined ? "" : undefined
    );
  }, []);

  const handleMulStartToggle = useCallback(() => {
    setMulStart((prev) =>
      prev === undefined ? "" : undefined
    );
  }, []);

  const hasLabel = useMemo(() => {
    return label !== undefined;
  }, [label]);

  const hasMulEnd = useMemo(() => {
    return mulEnd !== undefined;
  }, [mulEnd]);

  const hasMulStart = useMemo(() => {
    return mulStart !== undefined;
  }, [mulStart]);

  return (
    <Fragment>
      <SmoothStepEdge
        id={id}
        {...rest}
        markerEnd={`url(#${markerEnd})`}
        markerStart={`url(#${markerStart})`}
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
            value={label ?? ""}
            onTextChange={setLabel}
            sx={{
              textAlign: "center",
              maxWidth: 200,
              minWidth: 70,
              display: !hasLabel ? "none" : undefined,
              visibility: !hasLabel ? "hidden" : undefined,
              textShadow: TEXT_SHADOW,
            }}
          />
        </div>
      </EdgeLabelRenderer>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%,-100%) translate(${rest.targetX}px,${rest.targetY}px)`,
            pointerEvents: "all",
          }}
        >
          <StrictTextField
            placeholder="1..1"
            value={mulEnd ?? ""}
            onTextChange={setMulEnd}
            sx={{
              textAlign: "center",
              maxWidth: 200,
              minWidth: 70,
              display: !hasMulEnd ? "none" : undefined,
              visibility: !hasMulEnd ? "hidden" : undefined,
              textShadow: TEXT_SHADOW,
            }}
          />
        </div>
      </EdgeLabelRenderer>
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%,0%) translate(${rest.sourceX}px,${rest.sourceY}px)`,
            pointerEvents: "all",
          }}
        >
          <StrictTextField
            placeholder="1..1"
            value={mulStart ?? ""}
            onTextChange={setMulStart}
            sx={{
              textAlign: "center",
              maxWidth: 200,
              minWidth: 70,
              display: !hasMulStart ? "none" : undefined,
              visibility: !hasMulStart
                ? "hidden"
                : undefined,
              textShadow: TEXT_SHADOW,
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
                  value={markerStart ?? ""}
                  onChange={setMarkerStart}
                  options={MARKER_START_OPTIONS}
                />
                <IconButton
                  disableRipple
                  onClick={handleMarkerSwap}
                >
                  <SwapHorizRounded />
                </IconButton>
                <MenuButton
                  value={markerEnd ?? ""}
                  onChange={setMarkerEnd}
                  options={MARKER_END_OPTIONS}
                />
              </Stack>
              <MenuButton
                value={lineType}
                onChange={setLineType}
                options={lineTypeOptions}
              />
              <Stack
                spacing={1}
                direction="row"
              >
                <IconButton
                  disableRipple
                  onClick={handleLabelToggle}
                  color="default"
                >
                  {hasLabel && <TextDecreaseRounded />}
                  {!hasLabel && <TextIncreaseRounded />}
                </IconButton>
                <Tooltip
                  title={
                    <Typography>
                      Source multiplicity
                    </Typography>
                  }
                >
                  <IconButton
                    disableRipple
                    onClick={handleMulStartToggle}
                    color="default"
                  >
                    {hasMulStart && <TextDecreaseRounded />}
                    {!hasMulStart && (
                      <TextIncreaseRounded />
                    )}
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={
                    <Typography>
                      Target multiplicity
                    </Typography>
                  }
                >
                  <IconButton
                    disableRipple
                    onClick={handleMulEndToggle}
                    color="default"
                  >
                    {hasMulEnd && <TextDecreaseRounded />}
                    {!hasMulEnd && <TextIncreaseRounded />}
                  </IconButton>
                </Tooltip>
              </Stack>
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
