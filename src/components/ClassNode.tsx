import { DiagramClass } from "@/types/figure";
import {
  DeleteRounded,
  MoreVert,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
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
          type="target"
          position={Position.Top}
        />
        <Handle
          type="source"
          position={Position.Bottom}
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
            }}
          >
            <InputBase
              value={name}
              onChange={({ target }) => {
                setName(target.value);
              }}
              fullWidth
              placeholder="unnamed"
              multiline
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
              slotProps={{
                input: {
                  sx: {
                    "&:focus": {
                      textDecorationLine: "underline",
                    },
                    "fontFamily": "monospace",
                    "whiteSpace": "normal",
                    "overflowWrap": "break-word",
                    "fontWeight": "bold",
                    "textAlign": "center",
                  },
                  autoCorrect: "off",
                  spellCheck: "false",
                },
              }}
            />
            <IconButton
              component="span"
              size="small"
              ref={menuAnchorRef}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
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
