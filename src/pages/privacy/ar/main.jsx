import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalyticsConsent } from "../../precast-beam-factory/shared/analytics";
import FloatingContactActions from "../../precast-beam-factory/shared/FloatingContactActions";
import "../../../styles/tailwind.css";

document.body.classList.add("privacy-page");
initAnalyticsConsent("ar", { showPanel: false });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <FloatingContactActions canonicalUrl="https://realjetech.com/marketing/privacy/ar/" subject="مشروع Realjet" />
  </StrictMode>,
);
