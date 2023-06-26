import { SnackbarContent } from "@mui/material";
import SnackbarContext from "context/snackbar.context";
import TwitterContext from "context/twitter.context";
import { ITwitterUser } from "hooks/useTwitterFlow";
import { FC, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface ITwitterProvider {
  children: JSX.Element;
}
const TwitterProvider: FC<ITwitterProvider> = ({ children }) => {
  const [twitterUser, setTwitterUser] =
    useLocalStorageState<ITwitterUser>("twitterUser");
  const { openSnackBar } = useContext(SnackbarContext);

  const updateTwitterUser = (user: ITwitterUser) => {
    if (user) {
      if (openSnackBar)
        openSnackBar("You have successfully connected to Twitter", 5000);
    }
    setTwitterUser(user);
  };

  return (
    <TwitterContext.Provider value={{ updateTwitterUser, twitterUser }}>
      {children}
    </TwitterContext.Provider>
  );
};

export default TwitterProvider;
