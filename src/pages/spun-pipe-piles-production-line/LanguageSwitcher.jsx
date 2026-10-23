import { Globe } from "lucide-react";

const languages = [
  {
    code: "en",
    label: "English",
    lang: "en",
    href: "/marketing/spun-pipe-piles-production-line/",
  },
  {
    code: "id",
    label: "Bahasa Indonesia",
    lang: "id",
    href: "/marketing/spun-pipe-piles-production-line/id/",
  },
  {
    code: "vi",
    label: "Tiếng Việt",
    lang: "vi",
    href: "/marketing/spun-pipe-piles-production-line/vi/",
  },
  {
    code: "ar",
    label: "العربية",
    lang: "ar",
    href: "/marketing/spun-pipe-piles-production-line/ar/",
  },
];

export default function LanguageSwitcher({ current = "en" }) {

  return (
    <details className="group relative shrink-0">
      <summary aria-label="Choose language" title="Choose language" className="language-globe flex min-h-9 cursor-pointer list-none items-center justify-center rounded-lg p-2 text-white/80 hover:text-white [&::-webkit-details-marker]:hidden"><Globe size={19} aria-hidden="true" /></summary>
      <div className="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[190px] overflow-hidden rounded-lg border border-white/10 bg-brand-navy p-1.5 shadow-floating rtl:right-auto rtl:left-0">
        {languages.map(({ code, label, lang, href }) => (
          <a
            key={code}
            href={href}
            lang={lang}
            aria-current={code === current ? "page" : undefined}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-[12px] no-underline transition ${
              code === current ? "bg-white/8 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </details>
  );
}
