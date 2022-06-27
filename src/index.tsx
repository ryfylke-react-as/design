import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./vanilla/fonts.css";
import "./vanilla/reset.css";
import { DarkmodeProvider } from "./components/DarkmodeProvider";
import { ToastProvider } from "./components/ToastProvider";
import { BrowserRouter } from "react-router-dom";
// import "./vanilla/tokens.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkmodeProvider>
        <ToastProvider location="bottomright" zIndex={500} />
        <App />
      </DarkmodeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
