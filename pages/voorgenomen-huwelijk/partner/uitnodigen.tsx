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
import { FormEvent, useContext, useState } from "react";
import { ButtonGroup, ButtonLink, PageContentMain, PartnerInvitation } from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { HuwelijkService } from "../../../src/generated";

type contactType = {
  "section-partner given-name"?: string;
  "section-partner family-name"?: string;
  "section-partner email"?: string;
  "section-partner tel"?: string;
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const { locale, push } = useRouter();
  const [contact, setContact] = useState<contactType | null>();
  const [marriageOptions] = useContext(MarriageOptionsContext);

  const onPartnerInvitationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    HuwelijkService.huwelijkPatchItem(marriageOptions.huwelijk.id as string, {
      partners: [
        {
          contact: {
            voornaam: contact?.["section-partner given-name"],
            achternaam: contact?.["section-partner family-name"],
            emails: [{ naam: contact?.["section-partner email"], email: contact?.["section-partner email"] }],
            telefoonnummers: [
              { naam: contact?.["section-partner tel"], telefoonnummer: contact?.["section-partner tel"] },
            ],
          },
        },
      ],
    }).then(() => {
      push("/voorgenomen-huwelijk/getuigen");
    });
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
            <ButtonGroup>
              <ButtonLink href="/voorgenomen-huwelijk/partner" appearance="subtle-button">
                ← Terug
              </ButtonLink>
            </ButtonGroup>
            <PageContentMain>
              <form onSubmit={onPartnerInvitationSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                <ReservationCard locale={locale || "en"} />
                <PartnerInvitation
                  title="Nodig je partner uit"
                  body="Je kunt nu je partner uitnodigen om ook in te loggen met DigID. Zo bevestigt je partner dat jullie het huwelijk willen regelen."
                  onChange={(e) => setContact({ ...contact, [e.target.autocomplete]: e.target.value })}
                  partnerFirstName={{
                    value: "",
                    label: t("form:given-name"),
                  }}
                  partnerLastName={{
                    value: "",
                    label: t("form:family-name"),
                  }}
                  partnerEmail={{
                    value: "",
                    label: t("form:email"),
                  }}
                  partnerPhoneNumber={{
                    value: "",
                    label: t("form:tel"),
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
