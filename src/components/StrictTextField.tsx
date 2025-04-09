import {
  InputBase,
  InputBaseProps,
  SxProps,
  Theme,
} from "@mui/material";
import { ChangeEvent, FC, memo, useCallback } from "react";

const StyledInput: FC<InputBaseProps> = ({
  slotProps,
  sx,
  ...rest
}) => {
  return (
    <InputBase
      {...rest}
      sx={{
        fontFamily: "monospace",
        ...sx,
      }}
      slotProps={{
        ...slotProps,
        input: {
          sx: {
            "fontFamily": "monospace",
            "whiteSpace": "normal",
            "overflowWrap": "break-word",
            "textAlign": "inherit",
            "color": "inherit",
            "&:focus": {
              textDecorationLine: "underline",
            },
          },
          spellCheck: "false",
          autoCapitalize: "none",
        },
      }}
    />
  );
};

type Props = {
  placeholder?: string;
  value: string;
  onTextChange: (value: string) => void;
  sx?: SxProps<Theme>;
};
export const StrictTextField: FC<Props> = memo(
  ({ onTextChange, value, placeholder, sx }) => {
    const handleTextChange = useCallback(
      ({
        target,
      }: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >) => {
        onTextChange(target.value);
      },
      [onTextChange]
    );

    return (
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        multiline
        fullWidth
        sx={sx}
      />
    );
  }
);
