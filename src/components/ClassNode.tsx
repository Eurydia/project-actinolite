import { DiagramClass } from "@/types/figure";
import { MoreVert } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
} from "@mui/material";
import { NodeResizer } from "@xyflow/react";
import {
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { ClassAttributeItem } from "./ClassAttributeItem";
import { ClassAttributeRegion } from "./ClassAttributeRegion";
import { MethodRegion } from "./MethodRegion";
import { MethodItem } from "./MethodRegionItem";

type Props = {
  data: DiagramClass;
  selected: boolean;
};
export const ClassNode: FC<Props> = memo(
  ({ data, selected }) => {
    const [name, setName] = useState(data.name);
    const containerRef = useRef<HTMLDivElement | null>(
      null
    );
    const [menuOpen, setMenuOpen] = useState(false);
    const handleClick = useCallback(
      ({
        button,
        preventDefault,
      }: React.MouseEvent<HTMLDivElement>) => {
        if (button === 2) {
          preventDefault();
          setMenuOpen(true);
        }
      },
      []
    );
    return (
      <>
        <NodeResizer
          isVisible={selected}
          minWidth={400}
        />

        {/* <Handle
          type="target"
          position={Position.Top}
        />
        <Handle
          type="source"
          position={Position.Bottom}
        /> */}
        <Menu
          onClose={() => setMenuOpen(false)}
          open={menuOpen}
          anchorEl={containerRef.current}
          anchorOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          <MenuItem>
            <ListItemText>sadasd</ListItemText>
          </MenuItem>
        </Menu>
        <Paper
          ref={containerRef}
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
            sx={{
              backgroundColor: "pink",
              padding: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <IconButton
              size="small"
              sx={{
                visibility: "hidden",
              }}
            />
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
            <IconButton size="small">
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
              id={data.name + "-attrs-region"}
            >
              {data.attributes.map((attr, index) => (
                <ClassAttributeItem
                  group={data.name}
                  key={data.name + "attrs" + index}
                  id={data.name + "attrs" + index}
                  index={index}
                  data={attr}
                />
              ))}
            </ClassAttributeRegion>
            <MethodRegion id={data.name + "-method-region"}>
              {data.methods.map((method, index) => (
                <MethodItem
                  group={data.name}
                  key={data.name + "method" + index}
                  id={data.name + "method" + index}
                  index={index}
                  data={method}
                />
              ))}
            </MethodRegion>
          </Stack>
        </Paper>
      </>
    );
  }
);
