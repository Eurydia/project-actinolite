import {
  Button,
  Divider,
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
  useRef,
  useState,
} from "react";

type Option = ReactNode;

type Props = {
  options: Option[];
  value: number;
  onChange: (value: number) => void;
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

    const itemSelectHanlderProvider = useCallback(
      (value: number) => {
        return () => {
          onChange(value);
        };
      },
      [onChange]
    );

    return (
      <Fragment>
        <Button
          disableElevation
          variant="text"
          ref={anchorRef}
          onClick={handleMenuOpen}
        >
          {options[value]}
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
          {options.map((option, index) => (
            <Fragment key={`menuitem-${index}`}>
              <MenuItem
                onClick={itemSelectHanlderProvider(index)}
              >
                <ListItemText
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {option}
                </ListItemText>
              </MenuItem>
              <Divider />
            </Fragment>
          ))}
        </Menu>
      </Fragment>
    );
  }
);
