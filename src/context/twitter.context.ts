import { ITwitterUser } from "hooks/useTwitterFlow";
import { createContext } from "react";

interface ITwitterContext {
  twitterUser?: ITwitterUser;
  updateTwitterUser?: (user?: any) => void;
}

const TwitterContext = createContext<ITwitterContext>({});

export default TwitterContext;
