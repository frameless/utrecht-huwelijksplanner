import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, HTMLAttributes, useId } from "react";
import { ButtonGroup, Heading, LinkButton } from "./index";

export type LanguageToggleProps = HTMLAttributes<HTMLElement>;

export const LanguageToggle = ({ className, ...restProps }: LanguageToggleProps) => {
  const { locales, asPath, locale: currentLocale } = useRouter();
  type T = keyof typeof mappedLocales;
  const mappedLocales = { nl: "Netherlands", en: "English" };
  return (
    <nav {...restProps} className={clsx("utrecht-alternate-lang-nav", className)} aria-label="Taal kiezen">
      {locales &&
        locales.length > 0 &&
        locales.map((locale, i) => (
          <Fragment key={i}>
            <Link href={asPath} locale={locale}>
              <a
                className={clsx(
                  "utrecht-link",
                  "utrecht-link--alternate-lang",
                  locale === currentLocale && "utrecht-link--current-lang"
                )}
                hrefLang={locale}
                lang={locale}
                rel={locale !== currentLocale ? "alternate" : ""}
                title={mappedLocales[locale as T]}
              >
                {locale.toUpperCase()}
              </a>
            </Link>
            {i === 0 && <span aria-hidden="true"> | </span>}
            {/*TODO figure a way better than this, incase we add more languages*/}
          </Fragment>
        ))}
    </nav>
  );
};

export interface LanguageToggleButtonsProps extends HTMLAttributes<HTMLElement> {
  headingLevel: number;
}

export const LanguageToggleButtons = ({ className, headingLevel }: LanguageToggleButtonsProps) => {
  const router = useRouter();
  const { locales, pathname, query, asPath, locale: currentLocale } = router;
  const headingId = useId();

  const languages = [
    {
      label: "This page in English",
      locale: "en",
      lang: "en",
      textContent: "EN",
    },
    {
      label: "Deze pagina in het Nederlands",
      locale: "nl",
      lang: "nl",
      textContent: "NL",
    },
  ]
    .filter(({ locale }) => locales?.includes(locale))
    .map((obj) => ({
      ...obj,
      pressed: obj.lang === currentLocale,
    }));

  const setLocale = (locale: string) => {
    router.push(
      {
        route: pathname,
        query,
      } as any,
      asPath,
      { locale }
    );
  };

  return (
    <section className={clsx("utrecht-alternate-lang-nav", className)} aria-labelledby={headingId}>
      <Heading level={headingLevel} className="utrecht-alternate-lang-nav__heading" id={headingId}>
        Taal kiezen
      </Heading>
      <ButtonGroup role="group">
        {languages.map(({ pressed, label, lang, locale, textContent }) => (
          <LinkButton
            key={locale}
            pressed={pressed}
            aria-pressed={pressed}
            aria-label={label}
            lang={lang}
            onClick={() => setLocale(locale)}
          >
            {textContent}
          </LinkButton>
        ))}
      </ButtonGroup>
    </section>
  );
};
