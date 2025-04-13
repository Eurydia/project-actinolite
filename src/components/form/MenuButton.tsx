import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  FC,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

type Option = { label: ReactNode; value: string };

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};
export const MenuButton: FC<Props> = memo(
  ({ onChange, options, value }) => {
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuClose = useCallback(() => {
      setMenuOpen(false);
    }, []);
    const handleMenuOpen = useCallback(() => {
      setMenuOpen(true);
    }, []);

    const handleItemChange = useCallback(
      (value: string) => {
        return () => onChange(value);
      },
      [onChange]
    );

    const selectedOption = useMemo(() => {
      const opt = options.find(
        (option) => option.value === value
      );
      if (opt === undefined) {
        return null;
      }
      return opt.label;
    }, [value, options]);

    return (
      <Fragment>
        <Button
          disableElevation
          variant="text"
          ref={anchorRef}
          onClick={handleMenuOpen}
        >
          {selectedOption}
        </Button>
        <Menu
          open={menuOpen}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          anchorEl={anchorRef.current}
          anchorOrigin={{
            horizontal: "left",
            vertical: "top",
          }}
        >
          {options.map(({ label, value }, index) => (
            <MenuItem
              key={`menuitem-${index}`}
              onClick={handleItemChange(value)}
            >
              <ListItemText
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {label}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Fragment>
    );
  }
);
