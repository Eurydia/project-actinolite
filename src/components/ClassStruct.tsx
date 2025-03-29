import { FieldItem } from "@/types/fields";
import { AddRounded } from "@mui/icons-material";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FC, ReactNode } from "react";
import { ClassFieldItem } from "./ClassFieldItem";
import { Sortable } from "./ClassFieldRegion";

type Props = {
  children?: ReactNode;
  items: FieldItem[];
  onAdd: () => void;
};
export const ClassStruct: FC<Props> = (props) => {
  const { items, onAdd } = props;
  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2 }}
    >
      <Stack
        spacing={1}
        divider={
          <Divider
            flexItem
            variant="middle"
          />
        }
      >
        <Sortable id="field">
          {items.map((item, index) => (
            <ClassFieldItem
              key={"field" + index}
              id={item.name}
              index={index}
            >
              <Typography>{`${item.accessLevel} ${item.name}: ${item.type}`}</Typography>
            </ClassFieldItem>
          ))}
          <Button
            startIcon={<AddRounded />}
            onClick={onAdd}
            disableElevation
          >
            Add
          </Button>
        </Sortable>
        <Typography>?</Typography>
      </Stack>
    </Paper>
  );
};
