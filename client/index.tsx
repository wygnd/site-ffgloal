import React from 'react';
import {createRoot} from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

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