import React from 'react';
import {useCounter} from "@/store/counterStore";

const AdminPage = () => {

  const {count} = useCounter();

  return (
    <div>
      <h1>This admin panel</h1>
      <h2>This count is <b>{count}</b></h2>
    </div>
  );
};

export default AdminPage;