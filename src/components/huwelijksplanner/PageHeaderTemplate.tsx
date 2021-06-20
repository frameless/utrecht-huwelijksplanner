/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import {
  BreadcrumbNav,
  BreadcrumbNavLink,
  HeaderNav,
  HeaderNavLink,
  LanguageToggleButtons,
  Link,
  Paragraph,
  UtrechtLogo,
} from "../index";

export const PageHeaderTemplate = () => (
  <>
    <Paragraph className="utrecht-page-header__logo">
      <Link href="/" sameURL="no-link" boxContent>
        <UtrechtLogo />
      </Link>
    </Paragraph>
    <LanguageToggleButtons headingLevel={2} className="utrecht-page-header__alternate-lang-nav" />
    <HeaderNav className="utrecht-page-header__nav">
      <HeaderNavLink href="https://www.utrecht.nl/wonen-en-leven">Wonen en Leven</HeaderNavLink>
      <HeaderNavLink href="https://www.utrecht.nl/zorg-en-onderwijs/">Zorg en Onderwijs</HeaderNavLink>
      <HeaderNavLink href="https://www.utrecht.nl/werk-en-inkomen/">Werk en Inkomen</HeaderNavLink>
      <HeaderNavLink href="https://www.utrecht.nl/ondernemen/">Ondernemen</HeaderNavLink>
      <HeaderNavLink href="https://www.utrecht.nl/bestuur-en-organisatie/">Bestuur en Organisatie</HeaderNavLink>
    </HeaderNav>
    <BreadcrumbNav className="utrecht-page-header__breadcrumb-nav" appearance="arrows">
      {[
        {
          href: "https://utrecht.nl/",
          textContent: "Home",
        },
        {
          href: "https://pki.utrecht.nl/Loket/start.do",
          textContent: "Online loket",
        },
        {
          href: "https://pki.utrecht.nl/Loket/products/alphabet",
          textContent: "Producten",
        },
      ].map(({ href, textContent }, index) => (
        <BreadcrumbNavLink key={index} index={index} href={href}>
          {textContent}
        </BreadcrumbNavLink>
      ))}
    </BreadcrumbNav>
  </>
);
