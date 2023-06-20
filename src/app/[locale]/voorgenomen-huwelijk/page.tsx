import type { Metadata } from "next";
import React from "react";
import { ReservationCardContext } from "./context";
import {
  Aside,
  BackLink,
  ButtonGroup,
  ButtonLink,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  UtrechtDigidButton,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../../../components";
import { useTranslation } from "../../i18n";
type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-3"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("eenvoudig-trouwen")}`,
  };
}

export default async function IntendedMarriage({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-3", "common"]);

  // FIXME: get slug from state
  // TIP: to get the slug from the trouw-opties page,
  // 1- move the voorgenomen-huwelijk folder inside trouw-opties to make it as nested route
  // 2 - use searchparams to get the current slug https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  // the result will be something like: /trouw-opties/huwelijk/voorgenomen-huwelijk
  const slug = "huwelijk";
  const productName = locale === "nl" ? "Voorgenomen huwelijk" : "Intended marriage"; // TODO get this title from the JSON

  return (
    <>
      <BackLink href={`${locale}/trouw-opties/${slug}`}>← Terug</BackLink>
      <>
        <HeadingGroup>
          <Heading1>{productName}</Heading1>
          <Paragraph lead>
            {t("step-n-of-m", { n: 3, m: 5 })} — {t("title")}
          </Paragraph>
        </HeadingGroup>
        <ReservationCardContext locale={locale} />
        <section>
          <Heading2>Meld je voorgenomen huwelijk</Heading2>
          <Paragraph>Je logt hier in met DigiD. Zo geef je door aan de gemeente dat je wil gaan trouwen.</Paragraph>
          <Paragraph>Na deze stap vragen we ook aan je partner om in te loggen met DigiD.</Paragraph>
          <ButtonGroup>
            <UtrechtDigidButton>
              <ButtonLink appearance="primary-action-button" href="/login">
                Inloggen met DigiD <UtrechtIconArrow />
              </ButtonLink>
            </UtrechtDigidButton>
            <ButtonLink href="/gateway-login/person">Testomgeving login</ButtonLink>
          </ButtonGroup>
        </section>
        <Aside>
          <Heading2>Meer informatie</Heading2>
          <Paragraph>
            <UtrechtLink href="https://digid.nl/aanvragen" external target="_blank">
              DigiD aanvragen
            </UtrechtLink>
          </Paragraph>
        </Aside>
      </>
    </>
  );
}
