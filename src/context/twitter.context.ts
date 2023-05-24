import { ITwitterUser } from "hooks/useTwitterFlow";
import { createContext } from "react";

interface ITwitterContext {
  twitterUser?: ITwitterUser;
  updateTwitterUser?: React.Dispatch<React.SetStateAction<ITwitterUser | undefined>>;
}

const TwitterContext = createContext<ITwitterContext>({});

export default TwitterContext;
