import { useState } from "react";
import {
  getConsentPreferences,
  setConsentPreferences,
} from "../../precast-beam-factory/shared/analytics";

const preferenceCopy = {
  en: {
    analytics: "Analytics cookies",
    analyticsDescription: "Measure site use and the enquiry journey.",
    advertising: "Advertising cookies",
    advertisingDescription: "Measure conversions, support attribution and personalise advertising.",
  },
  id: {
    analytics: "Cookie analitik",
    analyticsDescription: "Mengukur penggunaan situs dan alur permintaan.",
    advertising: "Cookie iklan",
    advertisingDescription: "Mengukur konversi, mendukung atribusi, dan mempersonalisasi iklan.",
  },
  vi: {
    analytics: "Cookie phân tích",
    analyticsDescription: "Đo lường việc sử dụng website và hành trình gửi yêu cầu.",
    advertising: "Cookie quảng cáo",
    advertisingDescription: "Đo lường chuyển đổi, hỗ trợ phân bổ và cá nhân hóa quảng cáo.",
  },
  ar: {
    analytics: "ملفات ارتباط التحليلات",
    analyticsDescription: "قياس استخدام الموقع ومسار الاستفسار.",
    advertising: "ملفات ارتباط الإعلانات",
    advertisingDescription: "قياس الإحالات ودعم الإسناد وتخصيص الإعلانات.",
  },
  ru: {
    analytics: "Аналитические cookie",
    analyticsDescription: "Измерение использования сайта и пути отправки запроса.",
    advertising: "Рекламные cookie",
    advertisingDescription: "Измерение конверсий, поддержка атрибуции и персонализация рекламы.",
  },
  cn: {
    analytics: "分析统计 Cookie",
    analyticsDescription: "衡量网站使用情况和询盘流程。",
    advertising: "广告 Cookie",
    advertisingDescription: "衡量转化、支持广告归因和广告个性化。",
  },
  fr: {
    analytics: "Cookies d’analyse",
    analyticsDescription: "Mesurer l’utilisation du site et le parcours de demande.",
    advertising: "Cookies publicitaires",
    advertisingDescription: "Mesurer les conversions, assurer l’attribution et personnaliser la publicité.",
  },
  es: {
    analytics: "Cookies de analítica",
    analyticsDescription: "Medir el uso del sitio y el recorrido de consulta.",
    advertising: "Cookies publicitarias",
    advertisingDescription: "Medir conversiones, facilitar la atribución y personalizar la publicidad.",
  },
};

function PreferenceRow({ checked, description, label, onChange }) {
  return (
    <div className="flex min-h-16 items-center justify-between gap-4 border-t border-brand-blue/10 py-3 first:border-t-0">
      <span className="min-w-0">
        <strong className="block text-[13px] font-[800] text-brand-navy">{label}</strong>
        <span className="mt-0.5 block text-[12px] leading-[1.45] text-muted">{description}</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={onChange}
        className={`relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full border transition-colors ${
          checked ? "border-brand-blue bg-brand-blue" : "border-line bg-white"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[28px] rtl:-translate-x-[28px]" : "translate-x-1 rtl:-translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function AnalyticsPreferenceSwitch({ label, locale = "en" }) {
  const copy = preferenceCopy[locale] || preferenceCopy.en;
  const [preferences, setPreferences] = useState(getConsentPreferences);

  const toggle = (key) => {
    const next = { ...preferences, [key]: !preferences[key] };
    setConsentPreferences(next);
    setPreferences(next);
  };

  return (
    <div className="mt-3 rounded-xl border border-brand-blue/20 bg-soft px-4 py-2">
      <strong className="block py-2 text-[13px] font-[850] text-brand-navy">{label}</strong>
      <PreferenceRow
        checked={preferences.analytics}
        description={copy.analyticsDescription}
        label={copy.analytics}
        onChange={() => toggle("analytics")}
      />
      <PreferenceRow
        checked={preferences.advertising}
        description={copy.advertisingDescription}
        label={copy.advertising}
        onChange={() => toggle("advertising")}
      />
    </div>
  );
}
