import {ReactNode} from "react";

export interface IFormProps {
  className?: string | string[];
}

export interface IInputProps {
  className?: string | string[];
  type: string;
  name: string;
  value?: string;
  placeholder: string;
  required?: boolean;
  onChange?: any
}

export interface IFormData {
  name?: string;
  phone: string;
  message?: string;
  callback: string;
}

declare enum EFromDataCallback {
  callback = 0,
  whatsapp = 1,
  telegram = 2
}

export interface ISelectProps {
  className?: string | string[];
  defaultValue: string;
  values: SelectValue[];
  icon?: ReactNode;
  result: (value: EFromDataCallback) => void;
  clear: boolean;
}

export type SelectValue = {
  name: string;
  value: EFromDataCallback;
}