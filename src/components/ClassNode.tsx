import {
  DiagramClass,
  DiagramClassAttribute,
} from "@/types/figure";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { Box, Divider, Paper, Stack } from "@mui/material";
import {
  Handle,
  NodeProps,
  NodeResizer,
  Position,
} from "@xyflow/react";
import { FC, memo, useCallback, useState } from "react";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { StrictTextField } from "./StrictTextField";

export const ClassNode: FC<NodeProps> = memo(
  ({ id, data, selected }) => {
    const _data = data as DiagramClass;

    const [name, setName] = useState(_data.name);
    const [
      attributeContainerRef,
      attributeItems,
      setAttributeItems,
    ] = useDragAndDrop<
      HTMLUListElement,
      DiagramClassAttribute
    >(_data.attributes);

    // const [methodItems, setMethodItems] = useState(
    //   _data.methods
    // );
    // const [contextMenu, setContextMenu] = useState<{
    //   mouseX: number;
    //   mouseY: number;
    // } | null>(null);

    // const handleContextMenu = (event: React.MouseEvent) => {
    //   event.preventDefault();
    //   setContextMenu(
    //     contextMenu === null
    //       ? {
    //           mouseX: event.clientX + 2,
    //           mouseY: event.clientY - 6,
    //         }
    //       : null
    //   );

    //   const selection = document.getSelection();
    //   if (selection && selection.rangeCount > 0) {
    //     const range = selection.getRangeAt(0);

    //     setTimeout(() => {
    //       selection.addRange(range);
    //     });
    //   }
    // };

    // const handleClose = useCallback(() => {
    //   setContextMenu(null);
    // }, []);

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
        {/* <Menu
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
          <MenuItem>
            <ListItemText inset>New property</ListItemText>
          </MenuItem>
          <MenuItem>
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
        </Menu> */}
        <Paper
          variant="outlined"
          // onContextMenu={handleContextMenu}
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
            {/* <ClassMethodRegion
              id={id}
              items={methodItems}
            /> */}
          </Stack>
        </Paper>
      </>
    );
  }
);
