import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContent from "./context/firebase";
import { firebase, FieldValue, auth, db } from "./lib/firebase"
import "./styles/app.css"

ReactDOM.render(
  <FirebaseContent.Provider value={{ firebase, FieldValue, auth, db }}>
    <App />
  </FirebaseContent.Provider>,
  document.getElementById("root")
);
