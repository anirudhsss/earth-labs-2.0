import { FC } from "react";

interface IModalProvider {
  children: JSX.Element;
}

const ModalProvider: FC<IModalProvider> = ({ children }) => {
  return <>{children}</>;
};

export default ModalProvider;
