import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const ModalCustom = ({
  children,
  open,
  setOpen,
  overlayClass = "",
  modalClass = "",
}) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        classNames={{ overlay: overlayClass, modal: modalClass }}
        center
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalCustom;
