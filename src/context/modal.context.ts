import React from "react";

interface IModalContext {
  openModal?: () => void;
  closeModal?: () => void;
  isModalOpen?: boolean;
}

const ModalContext = React.createContext<IModalContext>({
  isModalOpen: false,
});

export default ModalContext;
