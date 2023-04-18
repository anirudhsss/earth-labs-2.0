import { FC } from "react";

interface IRenderIf {
  children: JSX.Element;
  isTrue: boolean;
}

const RenderIf: FC<IRenderIf> = ({ children, isTrue }): JSX.Element | null => {
  return isTrue ? children : null;
};

export default RenderIf;
