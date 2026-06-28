import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import ErrorBoundary from "./components/ErrorBoundary";
import { queryClient } from "./api/queryClient";
import { AuthProvider } from "./context/AuthContext";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Could not find #root element in index.html");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
