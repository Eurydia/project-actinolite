import { UMLClassData } from "@/types/figure";
import { AddRounded } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { ClassFieldItem } from "./ClassFieldItem";
import { Sortable } from "./ClassFieldRegion";

type Props = {
  classData: UMLClassData;
  children?: ReactNode;
  onAdd: () => void;
};
export const ClassFigure: FC<Props> = (props) => {
  const { onAdd, classData } = props;
  const { attributes, className } = classData;
  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2 }}
    >
      <Stack
        spacing={1}
        divider={<Divider flexItem />}
      >
        <Box textAlign="center">
          <Typography
            fontWeight={900}
            fontFamily="monospace"
          >
            {className}
          </Typography>
        </Box>
        <Box>
          <Toolbar
            variant="dense"
            disableGutters
          >
            <Tooltip
              title={<Typography>Add attribute</Typography>}
            >
              <IconButton>
                <AddRounded />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Sortable id={`${className}-attr-container`}>
            {attributes.map((item, index) => (
              <ClassFieldItem
                key={`${className}-attr-${index}`}
                id={`${className}-attr-${index}`}
                group={className}
                index={index}
              >
                <Typography fontFamily="monospace">{`${item.name}: ${item.type}`}</Typography>
              </ClassFieldItem>
            ))}
          </Sortable>
        </Box>
        <Typography>?</Typography>
      </Stack>
    </Paper>
  );
};
