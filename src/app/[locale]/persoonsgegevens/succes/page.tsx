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
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  ReservationCard,
  SkipLink,
  Surface,
} from "../../../../components";
import { PageFooterTemplate } from "../../../../components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../../components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const [marriageOptions] = useContext(MarriageOptionsContext);
  const { locale = "nl" } = useRouter();
  const contact = marriageOptions.partners[0]?.contact;

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 3 })}: ${t("huwelijksplanner-step-5:title")} - ${t(
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
              <form method="POST" action="/api/huwelijksplanner-step-5">
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                {marriageOptions.reservation ? (
                  <ReservationCard reservation={marriageOptions.reservation} locale={locale} />
                ) : (
                  ""
                )}
                <section>
                  <Heading2>Gelukt</Heading2>
                  <Paragraph>
                    We hebben jouw gegevens gekoppeld aan die van{" "}
                    <DataNoTranslate>{`${contact.voornaam} ${contact.achternaam}`}</DataNoTranslate>. Jullie kunnen nu
                    verder gaan met het plannen van jullie huwelijk.
                  </Paragraph>
                  <ButtonGroup>
                    <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/getuigen">
                      Nodig getuigen uit
                    </ButtonLink>
                  </ButtonGroup>
                </section>
              </form>
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
