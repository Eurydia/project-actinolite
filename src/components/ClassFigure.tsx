import { UMLClass } from "@/types/figure";
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
import { ClassAttributeItem } from "./ClassAttributeItem";
import { ClassAttributeRegion } from "./ClassAttributeRegion";

type Props = {
  classData: UMLClass;
  children?: ReactNode;
  onAdd: () => void;
};
export const ClassFigure: FC<Props> = (props) => {
  const { classData } = props;
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
          <ClassAttributeRegion
            id={`${className}-attr-container`}
          >
            {attributes.map((item, index) => (
              <ClassAttributeItem
                key={`${className}-attr-${index}`}
                id={`${className}-attr-${index}`}
                group={className}
                index={index}
                data={item}
              />
            ))}
          </ClassAttributeRegion>
        </Box>
        <Typography>?</Typography>
      </Stack>
    </Paper>
  );
};
