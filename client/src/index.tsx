import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout";
import NotFound from "@/components/notFound/NotFound";
import AdminPage from "@/pages/admin/AdminPage";
import App from "@/App";

const root = document.getElementById('global');

if (!root) {
  throw new Error('Element is not defined');
}

const containerApp = createRoot(root);

containerApp.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<App/>}/>
          <Route path="admin" element={<AdminPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)