import { useContextMenu } from "@/hooks/useContextMenu";
import { useWrappedNodeAttributeState } from "@/hooks/useWrappedNodeAttributeState";
import { useWrappedNodeState } from "@/hooks/useWrappedNodeState";
import { DiagramNodeData } from "@/types/figure";
import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
} from "@xyflow/react";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ClassAttributeRegion } from "../ClassAttributeRegion";
import { ClassMethodRegion } from "../ClassMethodRegion";
import { StrictTextField } from "../StrictTextField";
import { ColorPicker } from "../form/ColorPicker";
import { StyledContextMenu } from "../form/StyledContextMenu";

export const StyledNode: FC<
  NodeProps<Node<DiagramNodeData>>
> = memo(({ id, data, selected }) => {
  const { palette } = useTheme();
  const { onNodeAttributesChange } = useWrappedNodeState();

  const [color, setColor] = useState("#000");
  const [name, setName] = useState(data.name);

  const [contextMenuData, setContextMenuData] = useState<
    | { origin: "attr"; attrId: number }
    | { origin: "method"; methodId: number }
  >();
  const {
    contextMenuPos,
    onContextMenuClose,
    onContextMenuOpen,
  } = useContextMenu();

  const handleContextMenuOpenFromAttr = useCallback(
    (event: React.MouseEvent, attrId: number) => {
      setContextMenuData({ origin: "attr", attrId });
      onContextMenuOpen(event);
    },
    [onContextMenuOpen]
  );
  const handleContextMenuOpenFromMethod = useCallback(
    (event: React.MouseEvent, methodId: number) => {
      setContextMenuData({ origin: "method", methodId });
      onContextMenuOpen(event);
    },
    [onContextMenuOpen]
  );
  const handleContextMenuClose = useCallback(() => {
    setContextMenuData(undefined);
    onContextMenuClose();
  }, [onContextMenuClose]);

  const {
    containerRef: attrContainerRef,
    onAdd: onAttrAdd,
    onChange: onAttrChange,
    onDuplicate: onAttrDuplicate,
    onRemove: onAttrRemove,
    items: attrs,
  } = useWrappedNodeAttributeState(data.attributes);

  useEffect(() => {
    onNodeAttributesChange(id, attrs);
  }, [attrs, id, onNodeAttributesChange]);

  const handleAttrDuplicate = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "attr"
    ) {
      return;
    }
    onAttrDuplicate(contextMenuData.attrId);
  }, [contextMenuData, onAttrDuplicate]);

  const handleAttrRemove = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "attr"
    ) {
      return;
    }
    onAttrRemove(contextMenuData.attrId);
  }, [contextMenuData, onAttrRemove]);

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

  const textColorContrast = useMemo(() => {
    return palette.getContrastText(color);
  }, [color, palette]);

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
        onContextMenu={onContextMenuOpen}
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
            backgroundColor: color,
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
            sx={{ color: textColorContrast }}
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
            containerRef={attrContainerRef}
            items={attrs}
            onChange={onAttrChange}
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
      <StyledContextMenu
        anchorPosition={contextMenuPos}
        onClose={handleContextMenuClose}
      >
        <ColorPicker
          value={color}
          onChange={setColor}
        />
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem onClick={onAttrAdd}>
            <ListItemText inset>New attribute</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleAttrDuplicate}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "attr"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Duplicate attribute
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleAttrRemove}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "attr"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Remove attribute
            </ListItemText>
          </MenuItem>
        </MenuList>
        <Divider flexItem />
        {/* <MenuList onClick={handleContextMenuClose}>
          <MenuItem onClick={onMethodAdd}>
            <ListItemText inset>New method</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleMethodDuplicate}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "method"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>
              Duplicate method
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleMethodRemove}
            sx={{
              display:
                contextMenuData !== undefined &&
                contextMenuData.origin === "method"
                  ? undefined
                  : "none",
            }}
          >
            <ListItemText inset>Remove method</ListItemText>
          </MenuItem>
        </MenuList> */}
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem>
            <ListItemText inset>
              Duplicate class
            </ListItemText>
          </MenuItem>
        </MenuList>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText>Remove class</ListItemText>
          </MenuItem>
        </MenuList>
      </StyledContextMenu>
    </>
  );
});
