import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalyticsConsent } from "../../precast-beam-factory/shared/analytics";
import FloatingContactActions from "../../precast-beam-factory/shared/FloatingContactActions";
import "../../../styles/tailwind.css";

document.body.classList.add("privacy-page");
initAnalyticsConsent("vi", { showPanel: false });

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <FloatingContactActions canonicalUrl="https://realjetech.com/marketing/privacy/vi/" subject="dự án Realjet" />
  </React.StrictMode>,
);
