import React, {useEffect, useState} from 'react';
import {Outlet} from "react-router-dom";
import {IStatus} from "@/@types/status";
import {get_statuses} from "@/http/status-http";

const AdminPage = () => {

  const [statuses, setStatuses] = useState<IStatus[]>([]);

  const getDataStatuses = async () => {
    const data = await get_statuses();
    setStatuses(data);
  }

  useEffect(() => {
    getDataStatuses();
  }, []);

  return (
    <div>
      <h1>This admin panel</h1>
      <br/>
      {statuses.length !== 0 &&
				<ul>{statuses.map(status =>
          <li key={status.status_id}>{status.value}</li>
        )}
				</ul>
      }
      <Outlet/>
    </div>
  );
};

export default AdminPage;