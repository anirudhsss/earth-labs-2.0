import React, { Dispatch, SetStateAction } from "react";

interface IRainbowContext {
  updateTheme?: Dispatch<SetStateAction<any>>;
}

const RainbowThemeContext = React.createContext<IRainbowContext>({});

export default RainbowThemeContext;
