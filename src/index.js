import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SimpleExample from "./SimpleExample";
import HotelsExample from "./HotelsExample";
import SuperSimpleExample from "./SuperSimpleExample";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={SuperSimpleExample} exact />
      <Route path="/sudoku" component={App} exact />
      <Route path="/SimpleExample" component={SimpleExample} exact />
      <Route path="/HotelsExample" component={HotelsExample} exact />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
