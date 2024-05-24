import React from "react";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      <div className="modal">
        <div className="modal-inner">{children}</div>
      </div>
    </>
  );
};

export default Modal;
