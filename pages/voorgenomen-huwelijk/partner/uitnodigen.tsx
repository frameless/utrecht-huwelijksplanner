import {
  Document,
  Heading1,
  HeadingGroup,
  Page,
  PageContent,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  Surface,
} from "@utrecht/component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent } from "react";
import { BackLink, PageContentMain, PartnerInvitation, ReservationCard } from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { exampleState } from "../../../src/data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };
  const { locale = "nl", push } = useRouter();

  const onPartnerInvitationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push("/voorgenomen-huwelijk/partner/succes");
  };

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
            <BackLink href="/voorgenomen-huwelijk/partner">← Terug</BackLink>
            <PageContentMain>
              <form onSubmit={onPartnerInvitationSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                {data["reservation"] ? (
                  <ReservationCard reservation={data["reservation"]} locale={locale || "en"} />
                ) : (
                  ""
                )}
                <PartnerInvitation
                  title="Nodig je partner uit"
                  body="Je kunt nu je partner uitnodigen om ook in te loggen met DigID. Zo bevestigt je partner dat jullie het huwelijk willen regelen."
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
