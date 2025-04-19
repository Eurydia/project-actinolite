import { TextField } from "@mui/material";
import { FC, memo } from "react";

type Props = {
  value: any;
};
export const SessionFileInput: FC<Props> = memo(
  ({ value }) => {
    return <TextField />;
  }
);
