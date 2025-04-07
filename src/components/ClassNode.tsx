import {
  createClassAttribute,
  createClassMethod,
} from "@/services/models";
import {
  AccessLevel,
  DiagramClass,
  DiagramClassAttribute,
  DiagramClassMethod,
} from "@/types/figure";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { DeleteRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import {
  Handle,
  Node,
  NodeProps,
  NodeResizer,
  Position,
} from "@xyflow/react";
import { FC, memo, useCallback, useState } from "react";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { ClassMethodRegion } from "./ClassMethodRegion";
import { StrictTextField } from "./StrictTextField";

export const ClassNode: FC<NodeProps<Node<DiagramClass>>> =
  memo(({ id, data, selected }) => {
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
    });

    const [
      methodContainerRef,
      methodItems,
      setMethodItems,
    ] = useDragAndDrop<
      HTMLUListElement,
      DiagramClassMethod
    >(data.methods, { group: "class-method" });

    const [contextMenu, setContextMenu] = useState<{
      mouseX: number;
      mouseY: number;
    } | null>(null);

    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX + 2,
              mouseY: event.clientY - 6,
            }
          : null
      );

      const selection = document.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        setTimeout(() => {
          selection.addRange(range);
        });
      }
    };

    const handleClose = useCallback(() => {
      setContextMenu(null);
    }, []);

    const handleAttributeItemChange = useCallback(
      (value: DiagramClassAttribute, index: number) => {
        setAttributeItems((prev) => {
          const next = [...prev];
          next[index] = value;
          return next;
        });
      },
      [setAttributeItems]
    );

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
      setAttributeItems((prev) => {
        const next = [...prev];
        next.push(
          createClassAttribute({
            access_: AccessLevel.PUBLIC,
            primary: "",
            secondary: "",
          })
        );
        return next;
      });
      handleClose();
    }, [handleClose, setAttributeItems]);

    const handleAddMehod = useCallback(() => {
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
          position={Position.Top}
          id={id + "handle-top"}
        />
        <Handle
          type="source"
          position={Position.Right}
          id={id + "handle-right"}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id={id + "handle-bottom"}
        />
        <Handle
          type="source"
          position={Position.Left}
          id={id + "handle-left"}
        />
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? {
                  top: contextMenu.mouseY,
                  left: contextMenu.mouseX,
                }
              : undefined
          }
        >
          <MenuItem onClick={handleAddAttribute}>
            <ListItemText inset>New property</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAddMehod}>
            <ListItemText inset>New method</ListItemText>
          </MenuItem>
          <Divider flexItem />
          <MenuItem>
            <ListItemText inset>Change color</ListItemText>
          </MenuItem>
          <Divider flexItem />
          <MenuItem>
            <ListItemIcon>
              <DeleteRounded />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>
        <Paper
          variant="outlined"
          onContextMenu={handleContextMenu}
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: ({ palette }) =>
              palette.background.paper,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            className="node-handle"
            sx={{
              backgroundColor: "pink",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              textAlign: "center",
            }}
          >
            <StrictTextField
              value={name}
              onTextChange={setName}
              placeholder="unnamed"
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
              onItemChange={handleAttributeItemChange}
            />
            <ClassMethodRegion
              classId={id}
              items={methodItems}
              containerRef={methodContainerRef}
              onChange={handleMethodItemChange}
            />
          </Stack>
        </Paper>
      </>
    );
  });
