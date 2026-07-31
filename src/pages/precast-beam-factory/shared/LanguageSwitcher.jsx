import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", flag: "🇬🇧", label: "English", lang: "en" },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia", lang: "id" },
  { code: "ar", flag: "🇸🇦", label: "العربية", lang: "ar" },
  { code: "ru", flag: "🇷🇺", label: "Русский", lang: "ru" },
  { code: "cn", flag: "🇨🇳", label: "中文", lang: "zh-CN" },
  { code: "fr", flag: "🇫🇷", label: "Français", lang: "fr" },
  { code: "es", flag: "🇪🇸", label: "Español", lang: "es" },
];

export default function LanguageSwitcher({ current }) {
  const active = languages.find(({ code }) => code === current) ?? languages[0];

  return (
    <details className="group relative shrink-0 max-[720px]:ml-auto">
      <summary className="flex min-h-9 cursor-pointer list-none items-center gap-1.5 rounded-lg border border-white/15 px-2.5 text-[11px] font-[750] text-white/80 transition hover:border-white/30 hover:text-white max-[720px]:gap-1 max-[720px]:px-2 [&::-webkit-details-marker]:hidden">
        <span aria-hidden="true">{active.flag}</span>
        <span>{active.label}</span>
        <ChevronDown size={13} className="transition group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[184px] overflow-hidden rounded-lg border border-white/10 bg-brand-navy p-1.5 shadow-floating rtl:right-auto rtl:left-0">
        {languages.map(({ code, flag, label, lang }) => (
          <a
            key={code}
            href={`../${code}/`}
            lang={lang}
            aria-current={code === current ? "page" : undefined}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-[12px] transition ${
              code === current ? "bg-white/8 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span aria-hidden="true">{flag}</span>
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
