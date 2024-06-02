import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const Modal: React.FC<IProps> = ({ children }) => {

  return (
    <>
      <div className="modal">
        <div className="modal-inner">{children}</div>
      </div>
    </>
  );
};

export default Modal;
