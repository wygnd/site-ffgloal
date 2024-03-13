import React, {FC} from 'react';
import {ButtonVariant} from "../../esm/types";
import clsx from "clsx";
// import styles from './Button.module.scss';

interface IButton {
    children: React.ReactNode,
    type: ButtonVariant
}


const Button: FC<IButton> = ({children, type}) => {
    return (
      <></>
        // <button className={clsx(styles.button, {
        //         [styles.button]: type == "primary",
        //         [styles.button_invert]: type == "invert",
        //     }
        // )}>{children}</button>
    );
};

export default Button;