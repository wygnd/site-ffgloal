import React, {FC} from 'react';
import './Container.scss';

interface IContainer {
  children: React.ReactNode
}

const Container: FC<IContainer> = ({children}) => {
  return (
    <div className="container">
      {children}
    </div>
  );
};

export default Container;