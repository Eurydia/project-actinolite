import { DiagramClass } from "@/types/figure";
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
  NodeProps,
  NodeResizer,
  Position,
} from "@xyflow/react";
import {
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { ClassMethodRegion } from "./ClassMethodRegion";
import { StrictTextField } from "./StrictTextField";

export const ClassNode: FC<NodeProps> = memo(
  ({ id, data, selected }) => {
    const _data = data as DiagramClass;

    const [name, setName] = useState(_data.name);
    const menuAnchorRef = useRef<HTMLSpanElement | null>(
      null
    );
    const [menuOpen, setMenuOpen] = useState(false);
    const handleClick = useCallback(() => {
      setMenuOpen(true);
    }, []);
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
          component="div"
          onClose={() => setMenuOpen(false)}
          open={menuOpen}
          anchorEl={menuAnchorRef.current}
          anchorOrigin={{
            horizontal: "right",
            vertical: "center",
          }}
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
        </Menu>
        <Paper
          component="div"
          variant="outlined"
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
            component="div"
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
              items={_data.attributes}
            />
            <ClassMethodRegion
              id={id}
              items={_data.methods}
            />
          </Stack>
        </Paper>
      </>
    );
  }
);
