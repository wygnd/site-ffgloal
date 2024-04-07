import {ReactNode} from "react";

export interface IModalInstanceProps {
  className?: string | string[];
  children?: ReactNode;
  id?: string;
  show: boolean,
  hide: () => void;
}

export interface IModalMessageProps extends IModalInstanceProps {
  className?: string | string[];
  type?: ModalMessageTypeEnum
  message: string;
  icon?: ReactNode;
}

declare enum ModalMessageTypeEnum {
  info, success, error = -1
}

export type ModalStoreType = {
  showError: boolean;
  setError: (bool: boolean) => void;
  errorMsg?: string;
  setErrorMsg: (msg: string) => void;
  showSuccess: boolean;
  setSuccess: (bool: boolean) => void;
  successMsg?: string;
  setSuccessMsg: (msg: string) => void;
  showInfo: boolean;
  setInfo: (bool: boolean) => void;
  infoMsg?: string;
  setInfoMsg: (msg: string) => void;
  showModalForm: boolean;
  setModalForm: (bool: boolean) => void;
}