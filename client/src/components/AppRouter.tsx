import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "@/pages/notFoundPage/Not-found";
import MainPage from "@/pages/mainPage/Main-page";
import Layout from "@/components/Layout/Layout";
import AdminPage from "@/pages/adminPage/AdminPage";
import AuthPage from "@/pages/authPage/Auth-page";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<MainPage/>}/>
        <Route path="admin" element={<AdminPage/>}/>
        <Route path="auth" element={<AuthPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;