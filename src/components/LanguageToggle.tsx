import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fallbackLng, languages } from "../app/i18n/settings";
import "./LanguageToggle.scss";

export const LanguageToggle = () => {
  type T = keyof typeof mappedLocales;
  const mappedLocales = { nl: "Netherlands", en: "English" };
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return `/${fallbackLng}`;
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="utrecht-language-switcher">
      {languages &&
        languages
          .sort((a, b) => a.localeCompare(b))
          .map((locale) => (
            <span key={locale} className="utrecht-language-switcher_item">
              <Link
                href={redirectedPathName(locale)}
                locale={locale}
                className={clsx("utrecht-link", {
                  "utrecht-language-switcher_item--current": locale === redirectedPathName(locale),
                })}
                hrefLang={locale}
                lang={locale}
                rel={locale !== redirectedPathName(locale) ? "alternate" : ""}
                title={mappedLocales[locale as T]}
              >
                {locale.toUpperCase()}
              </Link>
            </span>
          ))}
    </div>
  );
};
