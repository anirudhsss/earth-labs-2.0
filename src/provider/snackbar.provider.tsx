import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import SnackbarContext from "context/snackbar.context";
import React from "react";
import { FC, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "components/shared/Alert/Alert";
import RenderIf from "components/shared/RenderIf";
import { textAlign } from "@mui/system";

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
    setTimeout(() => {
      setSnackbar({ isOpen: false });
    }, autoHideDuration);
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

  return (
    <SnackbarContext.Provider value={{ openSnackBar: handleOpen }}>
      <>
        <RenderIf isTrue={snackbar.isOpen}>
          <div
            style={{
              top: "60px",
              left: "0",
              maxWidth:'450px',
              right: "0",
              margin: "0 auto",
              position: "fixed",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            <Alert
              height={"40px"}
              padding={"0px 2rem"}
              text={<p>{snackbar.message}</p>}
            />
          </div>
        </RenderIf>
        {children}
      </>
    </SnackbarContext.Provider>
  );
};

export default SnackBarProvider;
