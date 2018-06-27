import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/index";
import { registerServiceWorker } from "./lib/service-worker";

const container = document.createElement("div");
document.body.appendChild(container);

function start() {
  console.log("starting application ...");
  registerServiceWorker(`${PUBLIC_PATH}service-worker.js`);
  ReactDOM.render(<App />, container);
}

start();
