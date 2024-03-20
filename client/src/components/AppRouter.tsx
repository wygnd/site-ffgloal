import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "@/pages/notFoundPage/NotFound";
import MainPage from "@/pages/mainPage/MainPage";
import Layout from "@/components/Layout/Layout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="" element={<MainPage/>}/>
        <Route path="admin" lazy={() => {
          return new Promise(() => {
            import("@/pages/adminPage/AdminPage");
          })
        }
        }/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
};

export default AppRouter;