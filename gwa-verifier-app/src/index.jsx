import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";
import App from "./App.jsx";

WebFont.load({ google: { families: ["Roboto:300,400,500"] } });

ReactDOM.render(<App />, document.getElementById("root"));
