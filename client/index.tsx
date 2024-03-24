import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "styles/main.scss";

const root = document.getElementById('global');

if (!root) {
  throw new Error('Element is not defined');
}

const containerApp = createRoot(root);

containerApp.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)