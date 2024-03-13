import React, {FC} from 'react';
// import styles from './Container.module.scss';

interface IContainer {
    width: string
    children: React.ReactNode
}

const Container: FC<IContainer> = ({width, children}) => {
    return (
        // <div style={{maxWidth: width}} className={styles.container}>
        //     {children}
        // </div>
      <></>
    );
};

export default Container;