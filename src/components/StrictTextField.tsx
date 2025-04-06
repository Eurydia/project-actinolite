import {
  ClickAwayListener,
  InputBase,
} from "@mui/material";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";

type Props = {
  value: string;
  onTextChange: (value: string) => void;
};
export const StrictTextField: FC<Props> = memo(
  ({ onTextChange, value }) => {
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
        <InputBase
          ref={ref}
          value={value}
          readOnly={readOnly}
          onChange={handleTextChange}
          onDoubleClick={handleEditRequest}
          onFocus={handleForceBlur}
          sx={{
            fontFamily: "monospace",
            maxWidth: 200,
          }}
          multiline
          slotProps={{
            input: {
              spellCheck: "false",
              autoCapitalize: "none",
              sx: {
                caretColor: readOnly
                  ? "transparent"
                  : "unset",
                textDecorationLine: readOnly
                  ? "unset"
                  : "underline",
              },
            },
          }}
        />
      </ClickAwayListener>
    );
  }
);
