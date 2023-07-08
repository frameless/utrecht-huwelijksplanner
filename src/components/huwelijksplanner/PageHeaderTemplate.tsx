/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import { HeaderDivider, LanguageToggleButtons, Link, Paragraph, UtrechtLogo } from "../index";

export const PageHeaderTemplate = () => (
  <>
    <Paragraph className="utrecht-page-header__logo">
      <Link href="/" sameURL="no-link" boxContent>
        <UtrechtLogo />
      </Link>
    </Paragraph>
    <LanguageToggleButtons headingLevel={2} className="utrecht-page-header__alternate-lang-nav" />
    <HeaderDivider />
  </>
);
