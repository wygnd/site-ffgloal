import React from 'react';
import AppRouter from "@/components/AppRouter";
import globalRouter from "@/utils/global-router";
import {useNavigate} from "react-router-dom";

const App = () => {

  globalRouter.navigate = useNavigate();

  return (
    <AppRouter/>
  );
};

export default App;