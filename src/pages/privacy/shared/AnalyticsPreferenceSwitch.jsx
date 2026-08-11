import { useState } from "react";
import {
  isAnalyticsConsentGranted,
  setAnalyticsConsent,
} from "../../precast-beam-factory/shared/analytics";

export default function AnalyticsPreferenceSwitch({ label, onLabel, offLabel }) {
  const [enabled, setEnabled] = useState(isAnalyticsConsentGranted);

  const toggle = () => {
    const nextValue = !enabled;
    setAnalyticsConsent(nextValue);
    setEnabled(nextValue);
  };

  return (
    <div className="mt-2 flex min-h-14 items-center justify-between gap-4 rounded-xl border border-brand-blue/20 bg-soft px-4 py-3">
      <span className="text-[13px] font-[800] text-brand-navy">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={toggle}
        className={`relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full border transition-colors ${
          enabled
            ? "border-brand-blue bg-brand-blue"
            : "border-line bg-white"
        }`}
      >
        <span className="sr-only">{enabled ? onLabel : offLabel}</span>
        <span
          aria-hidden="true"
          className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-[28px] rtl:-translate-x-[28px]" : "translate-x-1 rtl:-translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
