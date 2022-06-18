import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./vanilla/fonts.css";
import "./vanilla/reset.css";
import { DarkmodeProvider } from "./components/DarkmodeProvider";
import { ToastProvider } from "./components/ToastProvider";
// import "./vanilla/tokens.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <ToastProvider location="topright" zIndex={500} />
      <App />
    </DarkmodeProvider>
  </React.StrictMode>
);

reportWebVitals();
