import {
  Attributes,
  createElement,
  ComponentType,
  ComponentPropsWithRef,
} from 'react'
import {JSX} from "react/jsx-runtime";
import {BaseButtonComponent, BaseProps} from "@/@types/IButton";
import './Button.scss';


export type BaseButtonProps<C extends BaseButtonComponent = 'button'> =
  C extends keyof JSX.IntrinsicElements
    ? Omit<ComponentPropsWithRef<C>, keyof BaseProps<C>> & BaseProps<C>
    : C extends ComponentType<infer P>
      ? P extends ComponentPropsWithRef<any>
        ? Omit<P, keyof BaseProps<C>> & BaseProps<C>
        : never
      : never

export default function BaseButton<C extends BaseButtonComponent = 'button'>({
                                                                               component = 'button',
                                                                               children,
                                                                               ...props
                                                                             }: BaseButtonProps<C>) {
  return createElement(component, props, children)
}