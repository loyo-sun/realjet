import { openAnalyticsConsentSettings } from "../../precast-beam-factory/shared/analytics";

export default function AnalyticsPreferenceSwitch({ label }) {
  return (
    <button
      type="button"
      onClick={openAnalyticsConsentSettings}
      className="mt-2 inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-blue/30 bg-soft px-4 py-3 text-[13px] font-[800] text-brand-navy transition hover:border-brand-blue hover:bg-white"
    >
      {label}
    </button>
  );
}
