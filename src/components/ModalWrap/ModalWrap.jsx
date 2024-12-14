import Modal from "react-modal";

import css from "./ModalWrap.module.css";

Modal.setAppElement("#root");

export const ModalWrap = ({ children, isOpen, handleClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName={css.modalBackdrop}
      className={css.modalContent}
    >
      {children}
    </Modal>
  );
};
