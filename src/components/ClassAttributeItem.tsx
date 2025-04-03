import { DiagramClassAttribute } from "@/types/figure";
import { useSortable } from "@dnd-kit/react/sortable";
import { DragHandleRounded } from "@mui/icons-material";
import {
  Box,
  Grid,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

type Props = {
  id: string;
  index: number;
  data: DiagramClassAttribute;
  group: string;
};
export const ClassAttributeItem: FC<Props> = ({
  id,
  index,
  data,
  group,
}) => {
  const { ref, handleRef } = useSortable({
    id,
    index,
    group,
  });

  const [attrName, setAttrName] = useState(data.name);
  const [attrAccess, setAttrAccess] = useState(
    data.accessLevel
  );
  const [attrType, setAttrType] = useState(data.type);

  return (
    <Box
      ref={ref}
      sx={{
        userSelect: "none",
        cursor: "auto",
        fontSize: "inherit",
      }}
    >
      <Grid
        container
        spacing={0.5}
        columns={4}
      >
        <Grid size={1}>
          <InputBase
            value={attrAccess}
            onChange={({ target }) => {
              setAttrAccess(target.value);
            }}
            slotProps={{
              input: {
                sx: {
                  "fontFamily": "monospace",
                  "&:focus": {
                    textDecorationLine: "underline",
                  },
                },
                autoCorrect: "off",
                spellCheck: "false",
              },
            }}
          />
        </Grid>
        <Grid size="grow">
          <Stack
            spacing={1}
            direction="row"
            divider={<Typography>:</Typography>}
            alignItems="baseline"
          >
            <InputBase
              value={attrName}
              onChange={({ target }) => {
                setAttrName(target.value);
              }}
              multiline
              slotProps={{
                input: {
                  sx: {
                    "maxWidth": 200,
                    "fontFamily": "monospace",

                    "&:focus": {
                      textDecorationLine: "underline",
                    },
                  },
                  autoCorrect: "off",
                  spellCheck: "false",
                },
              }}
            />
            <InputBase
              value={attrType}
              onChange={({ target }) => {
                setAttrType(target.value);
              }}
              multiline
              slotProps={{
                input: {
                  sx: {
                    "fontFamily": "monospace",
                    "&:focus": {
                      textDecorationLine: "underline",
                    },
                    "fontStyle": "italic",
                    "maxWidth": 150,
                  },
                  autoCorrect: "off",
                  spellCheck: "false",
                },
              }}
            />
          </Stack>
        </Grid>
        <Grid size="auto">
          <DragHandleRounded
            fontSize="small"
            ref={handleRef}
            sx={{ cursor: "grab" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
