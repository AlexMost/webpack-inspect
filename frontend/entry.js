import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/index";

const container = document.createElement("div");
document.body.appendChild(container);

function start() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
    console.log("Service worker is registered");
  }

  console.log("starting application ...");
  ReactDOM.render(<App />, container);
}

start();
