import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "@/pages/notFoundPage/NotFound";
import MainPage from "@/pages/mainPage/MainPage";
import AdminPage from "@/pages/adminPage/AdminPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="*" element={<NotFound/>}/>
        <Route path="" element={<MainPage/>}/>
        <Route path="admin" element={<AdminPage/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;