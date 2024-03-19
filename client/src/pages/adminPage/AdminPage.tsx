import React from 'react';
import {Outlet} from "react-router-dom";

const AdminPage = () => {


  return (
    <div>
      <h1>This admin panel</h1>
      <br/>
      <Outlet/>
    </div>
  );
};

export default AdminPage;