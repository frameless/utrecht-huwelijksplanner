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
import { HuwelijkService } from "../../../src/generated";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";

type contactType = {
  text?: string;
  email?: string;
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
            voornaam: contact?.text,
            emails: [{ name: contact?.email, email: contact?.email }],
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
                  onChange={(e) => setContact({ ...contact, [e.target.type]: e.target.value })}
                  partnerName={{
                    value: "",
                    label: t("form:name"),
                  }}
                  partnerEmail={{
                    value: "",
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
