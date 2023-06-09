import TwitterContext from "context/twitter.context";
import { ITwitterUser } from "hooks/useTwitterFlow";
import { FC } from "react";
import useLocalStorageState from "use-local-storage-state";

interface ITwitterProvider {
  children: JSX.Element;
}
const TwitterProvider: FC<ITwitterProvider> = ({ children }) => {
  const [twitterUser, setTwitterUser] =
    useLocalStorageState<ITwitterUser>("twitterUser");

  const updateTwitterUser = (user: ITwitterUser) => {
    setTwitterUser(user);
  };

  return (
    <TwitterContext.Provider value={{ updateTwitterUser, twitterUser }}>
      {children}
    </TwitterContext.Provider>
  );
};

export default TwitterProvider;
