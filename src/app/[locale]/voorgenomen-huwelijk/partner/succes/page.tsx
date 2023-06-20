import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent } from "react";
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
  PartnerInvitation,
  ReservationCard,
  SkipLink,
  SpotlightSection,
  Surface,
} from "../../../../../components";
import { PageFooterTemplate } from "../../../../../components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../../../components/huwelijksplanner/PageHeaderTemplate";
import { exampleState } from "../../../../../data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };
  const { locale = "nl" } = useRouter();

  const onPartnerInvitationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-5:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <form onSubmit={onPartnerInvitationSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                {data["reservation"] ? (
                  <ReservationCard reservation={data["reservation"]} locale={locale || "en"} />
                ) : (
                  ""
                )}
                <SpotlightSection type="info">
                  <Heading2>
                    We wachten op <DataNoTranslate>{data.partnerInvitation?.["name"]}</DataNoTranslate>
                  </Heading2>
                  <Paragraph>
                    We bewaren deze reservering 2 uur. Als{" "}
                    <DataNoTranslate>{data.partnerInvitation?.["name"]}</DataNoTranslate> niet voor die tijd heeft
                    ingelogd, vervalt de reservering van deze datum en tijd.
                  </Paragraph>
                  <Paragraph>
                    Let op: u krijgt een e-mail als uw partner is ingelogd, dan kunt u doorgaan met uw
                    huwelijksaanvraag.
                  </Paragraph>
                </SpotlightSection>
                <ButtonGroup>
                  <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/partner/aanvrager-email">
                    Bekijk e-mail voor aanvrager
                  </ButtonLink>
                  <ButtonLink
                    appearance="primary-action-button"
                    href="/voorgenomen-huwelijk/partner/invitation-email-partner"
                  >
                    Bekijk e-mail voor partner
                  </ButtonLink>
                </ButtonGroup>
                <PartnerInvitation
                  title="Verstuur uitnodiging opnieuw"
                  body="Komt de uitnodiging niet aan? Controleer of je een foutje hebt gemaakt in het e-mailadres en verstuur de uitnodiging opnieuw."
                  partnerName={{
                    value: (data.partnerInvitation && data.partnerInvitation["name"]) ?? "",
                    label: t("form:name"),
                  }}
                  partnerEmail={{
                    value: (data.partnerInvitation && data.partnerInvitation["email"]) ?? "",
                    label: t("form:email"),
                  }}
                />
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
