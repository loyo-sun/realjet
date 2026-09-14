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
    <FloatingContactActions ariaLabel="Tùy chọn liên hệ" canonicalUrl="https://realjetech.com/marketing/privacy/vi/" enquiryLabel="Yêu cầu" messagingChannel="zalo" messagingHref="https://zalo.me/8619310090600" messagingLabel="Zalo" showEmail={false} subject="dự án Realjet" />
  </React.StrictMode>,
);
