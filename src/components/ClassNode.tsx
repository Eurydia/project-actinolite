import { WrappedNodeContext } from "@/context/WrappedNodeContext";
import { useContextMenu } from "@/hooks/useContextMenu";
import { useWrappedNodeAttributeState } from "@/hooks/useWrappedNodeAttributeState";
import { useWrappedNodeMethodState } from "@/hooks/useWrappedNodeMethodState";
import { DiagramNodeData } from "@/types/figure";
import {
  ContentCopyRounded,
  DeleteRounded,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  OutlinedInput,
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
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { ClassMethodRegion } from "./ClassMethodRegion";
import { StrictTextField } from "./StrictTextField";

export const ClassNode: FC<
  NodeProps<Node<DiagramNodeData>>
> = memo(({ id, data, selected }) => {
  const { palette } = useTheme();
  const [color, setColor] = useState("#000");
  const textColorContrast = useMemo(() => {
    return palette.getContrastText(color);
  }, [color, palette]);

  const [name, setName] = useState(data.name);

  const { onNodeAttributesChange, onNodeMethodsChange } =
    useContext(WrappedNodeContext);

  const {
    containerRef: methodContainerRef,
    items: methodItems,
    onAdd: onMethodAdd,
    onChange: onMethodChange,
    onDuplicate: onMethodDuplicate,
    onRemove: onMethodRemove,
  } = useWrappedNodeMethodState(data.methods);

  useEffect(() => {
    onNodeMethodsChange(id, methodItems);
  }, [id, methodItems, onNodeMethodsChange]);

  const [contextMenuData, setContextMenuData] = useState<
    | { origin: "attr"; attrId: number }
    | { origin: "method"; methodId: number }
  >();

  const {
    contextMenuPos,
    handleContextMenuClose: onContextMenuClose,
    handleContextMenuOpen: onContextMenuOpen,
    handlePreventDefaultContextMenu,
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

  const handleCopyColor = useCallback(() => {
    navigator.clipboard.writeText(color).then(
      () => toast.success("Copied to clipboard"),
      () => toast.error("Cannot copy to clipboard")
    );
  }, [color]);

  const {
    attributeContainerRef,
    attributeItems,
    onAttributeAdd,
    onAttributeChange,
    onAttributeDuplicate,
    onAttributeRemove,
  } = useWrappedNodeAttributeState(data.attributes);

  const handleAttributeDuplicate = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "attr"
    ) {
      return;
    }
    onAttributeDuplicate(contextMenuData.attrId);
  }, [contextMenuData, onAttributeDuplicate]);

  const handleAttributeRemove = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "attr"
    ) {
      return;
    }
    onAttributeRemove(contextMenuData.attrId);
  }, [contextMenuData, onAttributeRemove]);

  useEffect(() => {
    onNodeAttributesChange(id, attributeItems);
  }, [attributeItems, id, onNodeAttributesChange]);

  const handleMethodDuplicate = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "method"
    ) {
      return;
    }
    onMethodDuplicate(contextMenuData.methodId);
  }, [contextMenuData, onMethodDuplicate]);

  const handleMethodRemove = useCallback(() => {
    if (
      contextMenuData === undefined ||
      contextMenuData.origin !== "method"
    ) {
      return;
    }
    onMethodRemove(contextMenuData.methodId);
  }, [contextMenuData, onMethodRemove]);

  useEffect(() => {
    onNodeAttributesChange(id, attributeItems);
  }, [attributeItems, id, onNodeAttributesChange]);

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
            containerRef={attributeContainerRef}
            items={attributeItems}
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
      <Menu
        open={contextMenuPos !== undefined}
        onContextMenu={handlePreventDefaultContextMenu}
        onClose={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenuPos}
        slotProps={{
          paper: {
            sx: { scrollbarWidth: "none" },
          },
        }}
      >
        <Box padding={2}>
          <Stack spacing={1}>
            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ width: "100%" }}
            />
            <OutlinedInput
              size="small"
              value={color}
              onChange={({ target }) =>
                setColor(target.value)
              }
              sx={{ fontFamily: "monospace" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    disableRipple
                    size="small"
                    onClick={handleCopyColor}
                  >
                    <ContentCopyRounded />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </Box>
        <Divider flexItem />
        <MenuList onClick={handleContextMenuClose}>
          <MenuItem onClick={onAttributeAdd}>
            <ListItemText inset>New attribute</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={handleAttributeDuplicate}
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
            onClick={handleAttributeRemove}
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
        <MenuList onClick={handleContextMenuClose}>
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
        </MenuList>
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
      </Menu>
    </>
  );
});
