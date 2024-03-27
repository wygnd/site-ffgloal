import React from 'react';
import BaseButton, {BaseButtonProps} from "@/components/button/Base-button";
import clsx from "clsx";
import {BaseButtonComponent} from "@/@types/IButton";


export type ButtonProps<C extends BaseButtonComponent = 'button'> =
  BaseButtonProps<C> & {
  loading?: boolean
  disabled?: boolean
}

export function Button<C extends BaseButtonComponent = 'button'>({
                                                                   className,
                                                                   loading,
                                                                   disabled,
                                                                   ...props
                                                                 }: ButtonProps<C>) {
  return (
    <BaseButton<C>
      className={clsx(
        "btn",
      {
        "loading": loading,
        "disabled": disabled,
      },
        className,
        )}
      {...(props as BaseButtonProps<C>)}
    />
  )
}