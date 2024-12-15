import { useState } from "react";
import { ModalWrap } from "./ModalWrap/ModalWrap";
// import { DailyNormaModal } from "./DailyNormaModal/DailyNormaModal";
import { DeleteEntryModal } from "./DeleteEntryModal/DeleteEntryModal";

export const TestModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <ModalWrap isOpen={modalIsOpen} handleClose={closeModal}>
        <DeleteEntryModal closeModal={closeModal} />
      </ModalWrap>
    </>
  );
};
