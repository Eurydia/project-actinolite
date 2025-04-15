import { useContextMenu } from "@/hooks/useContextMenu";
import { createClassMethod } from "@/services/models";
import {
  AccessLevel,
  DiagramClassAttribute,
  DiagramClassMethod,
  DiagramNodeData,
} from "@/types/figure";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
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

  const [
    attributeContainerRef,
    attributeItems,
    setAttributeItems,
  ] = useDragAndDrop<
    HTMLUListElement,
    DiagramClassAttribute
  >(data.attributes, {
    group: "class-attribute",
    plugins: [animations()],
  });

  const [methodContainerRef, methodItems, setMethodItems] =
    useDragAndDrop<HTMLUListElement, DiagramClassMethod>(
      data.methods,
      {
        group: "class-method",
        plugins: [animations()],
      }
    );

  const {
    contextMenu,
    handleContextMenuClose,
    handleContextMenuOpen,
    handlePreventDefaultContextMenu,
  } = useContextMenu();

  const handleMethodItemChange = useCallback(
    (value: DiagramClassMethod, index: number) => {
      setMethodItems((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
    },
    [setMethodItems]
  );

  const handleAddAttribute = useCallback(() => {
    // setAttributeItems((prev) => {
    //   const next = [...prev];
    //   next.push(
    //     createClassAttribute({
    //       access_: AccessLevel.PUBLIC,
    //       primary: "",
    //       secondary: "",
    //     })
    //   );
    //   return next;
    // });
  }, [setAttributeItems]);

  const handleAddMethod = useCallback(() => {
    setMethodItems((prev) => {
      const next = [...prev];
      next.push(
        createClassMethod({
          access_: AccessLevel.PUBLIC,
          primary: "",
          secondary: "",
        })
      );
      return next;
    });
    handleClose();
  }, [handleClose, setMethodItems]);

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
        onContextMenu={handleContextMenuOpen}
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
            classId={id}
            containerRef={attributeContainerRef}
            items={attributeItems}
          />
          <ClassMethodRegion
            classId={id}
            items={methodItems}
            containerRef={methodContainerRef}
            onChange={handleMethodItemChange}
          />
        </Stack>
      </Paper>
      <Menu
        open={contextMenu !== undefined}
        onContextMenu={handlePreventDefaultContextMenu}
        onClose={handleContextMenuClose}
        onClick={handleContextMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu}
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
                    onClick={() => {
                      navigator.clipboard
                        .writeText(color)
                        .then(
                          () =>
                            toast.success(
                              "Copied to clipboard"
                            ),
                          () =>
                            toast.error(
                              "Cannot copy to clipboard"
                            )
                        );
                    }}
                  >
                    <ContentCopyRounded />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </Box>
        <Divider flexItem />
        <MenuItem onClick={handleAddAttribute}>
          <ListItemText inset>New attribute</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleAddMethod}>
          <ListItemText inset>New method</ListItemText>
        </MenuItem>
        <Divider flexItem />
        <MenuItem>
          <ListItemText inset>Duplicate</ListItemText>
        </MenuItem>
        <Divider flexItem />
        <MenuItem>
          <ListItemIcon>
            <DeleteRounded />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
});
