import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initLandingAnalytics } from "../shared/analytics";
import "../../../styles/tailwind.css";

initLandingAnalytics("ru");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
