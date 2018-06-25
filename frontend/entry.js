import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App/index";

const container = document.createElement("div");
document.body.appendChild(container);

function start() {
  console.log("starting application ...");
  ReactDOM.render(<App />, container);
}

start();
