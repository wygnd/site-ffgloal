import React, {FC} from 'react';
import ModalInstance from "@/components/modals/modalInstance/Modal-instance";
import {IModalMessageProps} from "@/@types/modal";
import clsx from "clsx";
import "./Modal-message.scss";

const ModalMessage: FC<IModalMessageProps> = ({className, type = 0, message, icon, show, hide}) => {

  return (
    <ModalInstance
      id={type === 0 && "modal-message" || type === 1 && "modal-success" || type === -1 && "modal-error"}
      className={clsx(className, "modal-message", "modal-info", type === 0 && "modal-message" || type === 1 && "modal-success" || type === -1 && "modal-error")}
      show={show}
      hide={hide}
    >
      {icon &&
				<div className="modal-icon">{icon}</div>
      }
      <div className="modal-message">{message}</div>
    </ModalInstance>
  );
};

export default ModalMessage;