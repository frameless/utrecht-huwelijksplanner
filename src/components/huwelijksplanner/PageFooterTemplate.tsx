/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

export const PageFooterTemplate = () => (
  <>
    <address className="utrecht-page-footer__address utrecht-page-footer__address--reset-address">
      <h2 className="utrecht-heading-2 utrecht-heading-2--reset-h2">Gemeente Utrecht</h2>
      <section>
        <h3 className="utrecht-heading-3 utrecht-heading-3--distanced">Telefoon</h3>
        <p className="utrecht-paragraph utrecht-paragraph--distanced">
          <a href="tel:+31302860000" className="utrecht-link utrecht-link--telephone">
            14 030
          </a>
        </p>
      </section>
      <section>
        <h3 className="utrecht-heading-3 utrecht-heading-3--distanced">Adres</h3>
        <p className="utrecht-paragraph utrecht-paragraph--distanced">
          <strong>Stadskantoor</strong>
          <br />
          Stadsplateau 1<br />
          3521AZ
        </p>
      </section>
    </address>
    <div className="utrecht-page-footer__navigation">
      <ul className="utrecht-link-list utrecht-link-list--chevron">
        <li className="utrecht-link-list__item">
          <a href="/contact/" className="utrecht-link">
            Meer contactinformatie
          </a>
        </li>
        <li className="utrecht-link-list__item">
          <a href="/over-deze-website" className="utrecht-link">
            Over deze website
          </a>
        </li>
      </ul>
    </div>
  </>
);
