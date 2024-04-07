import React, {FC, useState} from 'react';
import {IInputProps} from "@/@types/form";
import clsx from "clsx";
import "./Input.scss";
import InputMask from 'react-input-mask';

const Input: FC<IInputProps> = ({
                                  type,
                                  className,
                                  name,
                                  value = "",
                                  placeholder,
                                  required = false,
                                  ...props
                                }) => {
  if (type == "tel") {
    return (
      <InputMask
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        className={clsx(className)}
        {...props}
        mask="+7 999 999-99-99"
        maskChar="_"
      />
    )
  } else {
    return (
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        className={clsx(className)}
        {...props}
      />
    )
  }
};

export default Input;