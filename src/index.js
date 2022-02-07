import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./mobile.css";
import App from "./App";

const resizeHandler = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
window.addEventListener("resize", resizeHandler);

resizeHandler();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
