import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";

import { FC } from "react";
import { HexColorPicker } from "react-colorful";

type Props = {
  open: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
};
export const ColorPickerDialog: FC<Props> = ({
  onChange,
  onClose,
  open,
  value,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            value={value}
            onChange={({ target }) =>
              onChange(target.value)
            }
            sx={{ textTransform: "capitalize" }}
          />
          <HexColorPicker
            color={value}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disableElevation
          disableRipple
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
