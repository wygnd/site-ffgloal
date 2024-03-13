import React, {FC} from 'react';
import Header from "../Header/Header";

type TLayout = {
  children: React.ReactNode
}

const Layout: FC<TLayout> = ({children}) => {
  return (
    <>
      <Header/>
      {children}
    </>
  )
    ;
};

export default Layout;