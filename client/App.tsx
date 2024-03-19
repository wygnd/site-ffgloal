import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import MainPage from "@/pages/mainPage/MainPage";
import AdminPage from "@/pages/adminPage/AdminPage";


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/adin" element={<AdminPage/>}/>
      </Route>
    </Routes>
  </>
);

export default App;
