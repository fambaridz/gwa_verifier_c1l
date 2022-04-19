import React from "react";
import ReactDOM from "react-dom";
import WebFont from "webfontloader";

WebFont.load({google: {families: ["Roboto:300,400,500"]}});

ReactDOM.render(
    <div>
        <h1>Hello From React</h1>
    </div>
, document.getElementById("root"));