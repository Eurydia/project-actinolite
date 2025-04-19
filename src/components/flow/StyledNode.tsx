import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import {
  DiagramNodeAttributeData,
  DiagramNodeData,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Box, Divider, Paper, Stack } from "@mui/material";
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
} from "@xyflow/react";
import { FC, memo, useContext, useState } from "react";
import { ClassAttributeRegion } from "../ClassAttributeRegion";
import { ClassMethodRegion } from "../ClassMethodRegion";
import { StrictTextField } from "../StrictTextField";

export const StyledNode: FC<
  NodeProps<Node<DiagramNodeData>>
> = memo(({ id, data, selected }) => {
  // const { palette } = useTheme();
  // const [color, setColor] = useState("#000");
  // const textColorContrast = useMemo(() => {
  //   return palette.getContrastText(color);
  // }, [color, palette]);

  const [name, setName] = useState(data.name);

  const { onNodeAttributesChange, onNodeMethodsChange } =
    useContext(WrappedNodeContext);

  // const {
  //   containerRef: methodContainerRef,
  //   items: methodItems,
  //   onAdd: onMethodAdd,
  //   onChange: onMethodChange,
  //   onDuplicate: onMethodDuplicate,
  //   onRemove: onMethodRemove,
  // } = useWrappedNodeMethodState(data.methods);

  // useEffect(() => {
  //   onNodeMethodsChange(id, methodItems);
  // }, [id, methodItems, onNodeMethodsChange]);

  // const [contextMenuData, setContextMenuData] = useState<
  //   | { origin: "attr"; attrId: number }
  //   | { origin: "method"; methodId: number }
  // >();

  // const {
  //   contextMenuPos,
  //   handleContextMenuClose: onContextMenuClose,
  //   handleContextMenuOpen: onContextMenuOpen,
  //   handlePreventDefaultContextMenu,
  // } = useContextMenu();

  // const handleContextMenuOpenFromAttr = useCallback(
  //   (event: React.MouseEvent, attrId: number) => {
  //     setContextMenuData({ origin: "attr", attrId });
  //     onContextMenuOpen(event);
  //   },
  //   [onContextMenuOpen]
  // );

  // const handleContextMenuOpenFromMethod = useCallback(
  //   (event: React.MouseEvent, methodId: number) => {
  //     setContextMenuData({ origin: "method", methodId });
  //     onContextMenuOpen(event);
  //   },
  //   [onContextMenuOpen]
  // );

  // const handleContextMenuClose = useCallback(() => {
  //   setContextMenuData(undefined);
  //   onContextMenuClose();
  // }, [onContextMenuClose]);

  // const handleCopyColor = useCallback(() => {
  //   navigator.clipboard.writeText(color).then(
  //     () => toast.success("Copied to clipboard"),
  //     () => toast.error("Cannot copy to clipboard")
  //   );
  // }, [color]);

  // const {
  //   attributeContainerRef,
  //   attributeItems,
  //   onAttributeAdd,
  //   onAttributeChange,
  //   onAttributeDuplicate,
  //   onAttributeRemove,
  // } = useWrappedNodeAttributeState(data.attributes);

  // const handleAttributeDuplicate = useCallback(() => {
  //   if (
  //     contextMenuData === undefined ||
  //     contextMenuData.origin !== "attr"
  //   ) {
  //     return;
  //   }
  //   onAttributeDuplicate(contextMenuData.attrId);
  // }, [contextMenuData, onAttributeDuplicate]);

  // const handleAttributeRemove = useCallback(() => {
  //   if (
  //     contextMenuData === undefined ||
  //     contextMenuData.origin !== "attr"
  //   ) {
  //     return;
  //   }
  //   onAttributeRemove(contextMenuData.attrId);
  // }, [contextMenuData, onAttributeRemove]);

  // useEffect(() => {
  //   onNodeAttributesChange(id, attributeItems);
  // }, [attributeItems, id, onNodeAttributesChange]);

  // const handleMethodDuplicate = useCallback(() => {
  //   if (
  //     contextMenuData === undefined ||
  //     contextMenuData.origin !== "method"
  //   ) {
  //     return;
  //   }
  //   onMethodDuplicate(contextMenuData.methodId);
  // }, [contextMenuData, onMethodDuplicate]);

  // const handleMethodRemove = useCallback(() => {
  //   if (
  //     contextMenuData === undefined ||
  //     contextMenuData.origin !== "method"
  //   ) {
  //     return;
  //   }
  //   onMethodRemove(contextMenuData.methodId);
  // }, [contextMenuData, onMethodRemove]);

  // useEffect(() => {
  //   onNodeAttributesChange(id, attributeItems);
  // }, [attributeItems, id, onNodeAttributesChange]);

  const [attributeContainerRef, , setAttributes] =
    useDragAndDrop<
      HTMLUListElement,
      DiagramNodeAttributeData
    >(data.attributes, {
      group: "class-attribute",
      plugins: [animations()],
    });

  return (
    <>
      <NodeResizer
        isVisible={selected}
        minWidth={400}
      />
      <Handle
        type="source"
        position={Position.Bottom}
      />
      <Handle
        type="target"
        position={Position.Top}
      />

      <Paper
        variant="outlined"
        // onContextMenu={onContextMenuOpen}
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: ({ palette }) =>
            palette.background.paper,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          className="node-handle"
          sx={{
            // backgroundColor: color,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            textAlign: "center",
            padding: 1.5,
          }}
        >
          <StrictTextField
            value={name}
            onTextChange={setName}
            placeholder="unnamed"
            // sx={{ color: textColorContrast }}
          />
        </Box>
        <Stack
          spacing={1}
          divider={<Divider variant="middle" />}
          sx={{
            height: "100%",
            overflow: "auto",
            scrollbarWidth: "thin",
          }}
        >
          <ClassAttributeRegion
            nodeId={id}
            containerRef={attributeContainerRef}
            items={data.attributes}
            onChange={onAttributeChange}
            onContextMenu={handleContextMenuOpenFromAttr}
          />
          <ClassMethodRegion
            nodeId={id}
            items={methodItems}
            containerRef={methodContainerRef}
            onChange={onMethodChange}
            onContextMenu={handleContextMenuOpenFromMethod}
          />
        </Stack>
      </Paper>
    </>
  );
});
