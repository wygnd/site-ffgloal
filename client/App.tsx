import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import MainPage from "@/pages/mainPage/MainPage";


const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<MainPage/>}/>
      </Route>
    </Routes>
  </>
);

export default App;
