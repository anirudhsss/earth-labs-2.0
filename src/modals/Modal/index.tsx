import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FC } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  width: "600px",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "3rem",
};

interface IBasicModal {
  open: boolean;
  handleClose: () => void;
  content: JSX.Element;
  width?: string;
}

const BasicModal: FC<IBasicModal> = ({ open, handleClose, content, width }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: width }}>{content}</Box>
    </Modal>
  );
};

export default BasicModal;
