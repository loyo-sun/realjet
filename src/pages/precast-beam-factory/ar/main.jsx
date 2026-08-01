import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initLandingAnalytics } from "../shared/analytics";
import "../../../styles/tailwind.css";

initLandingAnalytics("ar");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
