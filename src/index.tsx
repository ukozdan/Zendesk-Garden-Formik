import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from "react-dom";
import IncidentForm from "./components/IncidentForm";
import "./styles.css";
// https://garden.zendesk.com/components/theme-object

function App() {
  return <IncidentForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
