import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import SnackbarContext from "context/snackbar.context";
import React from "react";
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IServiceProvider {
  children: JSX.Element;
}

interface ISnackBar {
  message?: string;
  isOpen: boolean;
  autoHideDuration?: number;
}

const SnackBarProvider: FC<IServiceProvider> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<ISnackBar>({
    isOpen: false,
    autoHideDuration: 6000,
  });

  const handleClose = () => {
    setSnackbar({ isOpen: false });
  };

  const handleOpen = (message: string, autoHideDuration = 6000) => {
    setSnackbar({ isOpen: true, message, autoHideDuration });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const Message = () => {
    return <span style={{ fontSize: "1.4rem" }}>{snackbar.message}</span>;
  };

  return (
    <SnackbarContext.Provider value={{ openSnackBar: handleOpen }}>
      <>
        {children}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbar.isOpen as boolean}
          autoHideDuration={snackbar.autoHideDuration}
          onClose={handleClose}
          message={<Message />}
          action={action}
        />
      </>
    </SnackbarContext.Provider>
  );
};

export default SnackBarProvider;
