import { ContentCopyRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { FC, memo, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "react-toastify";

type Props = {
  value: string;
  onChange: (value: string) => void;
};
export const ColorPicker: FC<Props> = memo(
  ({ onChange, value }) => {
    const handleCopyColor = useCallback(() => {
      navigator.clipboard.writeText(value).then(
        () => toast.success("Copied to clipboard"),
        () => toast.error("Copy failed")
      );
    }, [value]);

    return (
      <Box padding={2}>
        <Stack spacing={1}>
          <HexColorPicker
            color={value}
            onChange={onChange}
            style={{ width: "100%" }}
          />
          <OutlinedInput
            size="small"
            value={value}
            onChange={({ target }) =>
              onChange(target.value)
            }
            sx={{ fontFamily: "monospace" }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableRipple
                  size="small"
                  onClick={handleCopyColor}
                >
                  <ContentCopyRounded />
                </IconButton>
              </InputAdornment>
            }
          />
        </Stack>
      </Box>
    );
  }
);
