import React, {FC} from 'react';
import {IModalInstanceProps} from "@/@types/modal";
import clsx from "clsx";
import "./Modal-instance.scss";
import {IoClose} from "react-icons/io5";

const ModalInstance: FC<IModalInstanceProps> = ({className, children, id, show, hide}) => {

  const hideModal = () => hide();

  return (
    <>
      <div id={id} className={clsx("modal-instance", className, show && "modal-open")}>
        <div className="modal-close" onClick={hideModal}>
          <IoClose/>
        </div>
        {children}
      </div>
      {show &&
				<div className="modal-background" onClick={hideModal}></div>
      }
    </>
  );
};

export default ModalInstance;