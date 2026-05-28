import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";   // ← இதுமட்டும் இங்க add பண்ணு

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
