import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import MainPage from "@/pages/mainPage/MainPage";
import AdminPage from "@/pages/adminPage/AdminPage";
import NotFound from "@/pages/notFoundPage/NotFound";


const App = () => {
  return (
<Routes>
  <Route path="/" element={<Layout/>}>
    <Route path="/" element={<MainPage/>}/>
    <Route path="/admin" element={<AdminPage/>} />
    <Route path="/*" element={<NotFound/>} />
  </Route>
</Routes>
  );
};

export default App;