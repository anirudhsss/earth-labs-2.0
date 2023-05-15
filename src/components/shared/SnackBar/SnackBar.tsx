import Alert from "@mui/material/Alert";
import { FC } from "react";

interface ISnackbar {
  children: JSX.Element;
  open: boolean;
  handleClose: () => void;
}

const SnackBar: FC<ISnackbar> = ({ children, open, handleClose }) => {
  return (
    <Alert severity="error">This is an error message!</Alert>
  );
};

export default SnackBar;
