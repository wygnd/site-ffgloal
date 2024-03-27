import React, {Attributes, Component, ComponentType} from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type BaseButtonComponent =
  | keyof IntrinsicElements
  | ComponentType<any>

export type BaseProps<C extends BaseButtonComponent = 'button'> = {
  component?: C
  className?: string | string[],
} & Attributes