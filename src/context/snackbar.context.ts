import React from "react";

interface ISnackbarContext {
  openSnackBar?: (message: string, autoHideDuration: number) => void;
}

const SnackbarContext = React.createContext<ISnackbarContext>({});

export default SnackbarContext;
