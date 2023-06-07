import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import {
  ButtonGroup,
  ButtonLink,
  DataNoTranslate,
  Document,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  OrderedList,
  OrderedListItem,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  ReservationCard,
  SkipLink,
  SpotlightSection,
  Surface,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-getuigen-success", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-getuigen-success", "form"]);
  const [marriageOptions] = useContext(MarriageOptionsContext);
  const { locale = "nl" } = useRouter();
  const { voornaam } = marriageOptions.partners[0]?.contact;

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 3 })}: ${t("huwelijksplanner-step-getuigen-success:title")} - ${t(
            "common:website-name"
          )}`}</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <HeadingGroup>
                <Heading1>{t("huwelijksplanner-step-getuigen-success:heading-1")}</Heading1>
                <Paragraph lead>
                  {t("common:step-n-of-m", { n: 3, m: 5 })} — {t("huwelijksplanner-step-getuigen-success:title")}
                </Paragraph>
              </HeadingGroup>
              {marriageOptions.reservation && (
                <ReservationCard reservation={marriageOptions.reservation} locale={locale} />
              )}
              <section>
                <Heading2>Gelukt!</Heading2>
                <Paragraph>
                  {voornaam ? <DataNoTranslate>{voornaam}</DataNoTranslate> : <>Je partner</>} heeft met DigID ingelogd.
                  Nu kunnen jullie verder met het plannen van het huwelijk. Er volgen nog een paar stappen:
                </Paragraph>
                <OrderedList>
                  <OrderedListItem>
                    De gemeente Utrecht checkt een aantal dingen, bijvoorbeeld of{" "}
                    {voornaam ? <DataNoTranslate>{voornaam}</DataNoTranslate> : <>je partner</>} geen broer of zus van
                    je is
                  </OrderedListItem>
                  <OrderedListItem>Dan kun je betalen en is de reservering van je huwelijk klaar.</OrderedListItem>
                  <OrderedListItem>
                    Je kunt alvast de getuigen uitnodigen en/of extra’s aanschaffen om je huwelijk nog leuker te maken.
                    Dat kan natuurlijk ook later.
                  </OrderedListItem>
                </OrderedList>
                <ButtonGroup>
                  <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/checken">
                    Laat de gemeente checken en ga betalen
                  </ButtonLink>
                </ButtonGroup>
                <Paragraph>of:</Paragraph>
                <ButtonGroup>
                  <ButtonLink appearance="secondary-action-button" href="/extra">
                    Vul aan met extra's
                  </ButtonLink>
                </ButtonGroup>
              </section>
              <SpotlightSection aside type="info">
                <Heading2>Meer informatie</Heading2>
                <Paragraph>
                  <Link
                    external
                    href="https://www.rijksoverheid.nl/onderwerpen/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/vraag-en-antwoord/trouwen-of-geregistreerd-partnerschap-sluiten"
                  >
                    Voorwaarden huwelijk of geregistreerd partnerschap
                  </Link>
                </Paragraph>
              </SpotlightSection>
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <PageFooterTemplate />
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
}
