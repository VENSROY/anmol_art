import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Could not find #root element in index.html");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
