import { TextField } from "@mui/material";
import { ChangeEvent, FC, memo, useCallback } from "react";

type Props = {
  value: File | null;
  onChange: (value: File | null) => void;
};
export const FileInput: FC<Props> = memo(
  ({ onChange, value }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
          onChange(null);
          return;
        }
        const file = e.target.files.item(0);
        onChange(file);
      },
      [onChange]
    );

    return (
      <TextField
        type="file"
        onChange={handleChange}
        value={value}
        fullWidth
        slotProps={{
          htmlInput: {
            type: "file",
            multiple: false,
            accept: [".atnl"],
          },
        }}
      />
    );
  }
);
