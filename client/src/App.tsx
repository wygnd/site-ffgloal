import React from 'react';
import 'styles/main.scss';
import {Outlet} from "react-router-dom";

const App = () => {
  return (
    <main>
     <h1>Hello, world</h1>
      <Outlet />
    </main>
  );
};

export default App;