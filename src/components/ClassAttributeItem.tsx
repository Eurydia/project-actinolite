import { UMLClassAttribute } from "@/types/figure";
import { useSortable } from "@dnd-kit/react/sortable";
import { SaveRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";

type Props = {
  id: string;
  index: number;
  group: string;
  data: UMLClassAttribute;
};
export const ClassAttributeItem: FC<Props> = (props) => {
  const { group, id, index, data } = props;
  const { ref, isDragging, sortable } = useSortable({
    id,
    index,
    group,
    type: "attr",
    accept: ["attr"],
  });
  const [attrName, setAttrName] = useState(data.name);
  const [editing, setEditing] = useState(false);
  const { palette } = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        cursor: sortable.disabled
          ? "auto"
          : isDragging
          ? "grabbing"
          : "grab",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        userSelect: "none",
        width: "100%",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          display: !editing ? "none" : undefined,
        }}
      >
        <TextField
          slotProps={{
            input: {
              style: { fontFamily: "monospace" },
            },
          }}
          value={attrName}
          onChange={({ target }) => {
            setAttrName(target.value);
          }}
        />
        <Toolbar
          variant="dense"
          disableGutters
        >
          <Button
            disableElevation
            disableRipple
            onClick={() => {
              setEditing(false);
              sortable.disabled = false;
            }}
            startIcon={<SaveRounded />}
            variant="contained"
          >
            Save
          </Button>
        </Toolbar>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        divider={
          <Typography fontFamily="monospace">:</Typography>
        }
        sx={{
          display: editing ? "none" : undefined,
        }}
      >
        <Typography
          fontFamily="monospace"
          sx={{
            cursor: "text",
          }}
          onClick={() => {
            setEditing(true);
            sortable.disabled = true;
          }}
        >
          {attrName}
        </Typography>
        <Typography
          fontFamily="monospace"
          fontStyle="italic"
        >
          {data.type}
        </Typography>
      </Stack>
    </Box>
  );
};
