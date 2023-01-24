import React from "react";
import ReactDOM from "react-dom";
import App from "../modules/App";
// Create a new ZAFClient
var client = ZAFClient.init();

// add an event listener to detect once your app is registered with the framework
client.on("app.registered", async function (appData) {
  ReactDOM.render(<App client={client} />, document.getElementById("root"));
});
