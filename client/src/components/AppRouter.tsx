import React from 'react';
import {redirect, Route, Routes} from "react-router-dom";
import NotFound from "@/pages/notFoundPage/Not-found";
import MainPage from "@/pages/mainPage/Main-page";
import Layout from "@/components/Layout/Layout";
import AdminPage from "@/pages/adminPage/AdminPage";
import AuthPage from "@/pages/authPage/Auth-page";
import {userStore} from "@/store/user-store";

const AppRouter = () => {

  const {is_auth} = userStore();

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<MainPage/>}/>
        <Route path="admin" action={() => {
          // if (!is_auth) {
          //   return redirect('/auth')
          // }
          return null;
        }} element={<AdminPage/>}/>
        <Route path="auth" action={() => {
          if (is_auth) {
            return redirect('/admin')
          }
        }} element={<AuthPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;