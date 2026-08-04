import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initLandingAnalytics } from "../precast-beam-factory/shared/analytics";
import "../../styles/tailwind.css";

initLandingAnalytics("en", {
  formName: "contract-manufacturing-inquiry",
  pageType: "contract_manufacturing",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
