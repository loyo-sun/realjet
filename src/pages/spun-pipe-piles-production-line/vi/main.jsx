import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../App";
import { initLandingAnalytics } from "../../precast-beam-factory/shared/analytics";
import "../../../styles/tailwind.css";

initLandingAnalytics("vi", {
  formName: "universal-enquiry",
  pageType: "spun_pipe_piles_production_line",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App locale="vi" />
  </StrictMode>,
);
