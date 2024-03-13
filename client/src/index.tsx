import {createRoot} from "react-dom/client";
import App from "@/App";

const root = document.getElementById('global');

if (!root) {
  throw new Error('Element is not defined');
}

const containerApp = createRoot(root);

containerApp.render(
  <App/>
)