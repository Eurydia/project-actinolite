import {
  ClickAwayListener,
  InputBase,
  InputBaseProps,
  SxProps,
  Theme,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";

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
            "textDecorationLine": "underline",
            "&:read-only": {
              caretColor: "transparent",
              textDecorationLine: "unset",
            },
            "textAlign": "inherit",
            "color": "inherit",
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

    const ref = useRef<HTMLDivElement>(null);
    const [readOnly, setReadOnly] = useState(true);

    const handleClickAway = useCallback(() => {
      setReadOnly(true);
    }, []);

    const handleEditRequest = useCallback(() => {
      setReadOnly(false);
    }, []);

    const handleForceBlur = useCallback(() => {
      if (readOnly && ref.current !== null) {
        ref.current.blur();
      }
    }, [readOnly]);

    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <StyledInput
          placeholder={placeholder}
          ref={ref}
          value={value}
          readOnly={readOnly}
          onChange={handleTextChange}
          onDoubleClick={handleEditRequest}
          onFocus={handleForceBlur}
          multiline
          fullWidth
          sx={sx}
        />
      </ClickAwayListener>
    );
  }
);
