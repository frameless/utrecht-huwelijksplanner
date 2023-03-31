import { UtrechtDigidButton, UtrechtIconArrow } from "@utrecht/web-component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext } from "react";
import {
  Button,
  ButtonGroup,
  ButtonLink,
  Document,
  Heading1,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  Surface,
  Link as UtrechtLink,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const { locale, push } = useRouter();

  const [marriageOptions] = useContext(MarriageOptionsContext);

  // FIXME: personId from state
  const personId = "xxxx";

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
              <ButtonLink href={`/persoonsgegevens/${personId}`} appearance="subtle-button">
                ← Terug
              </ButtonLink>
            </ButtonGroup>
            <PageContentMain>
              <HeadingGroup>
                <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                {/*TODO: Previous button */}
                {/*TODO: Step indicator component */}
                <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
              </HeadingGroup>
              {/*TODO: Banner / card */}
              <ReservationCard locale={locale || "en"} />
              <section>
                <Paragraph>
                  We hebben jouw gegevens ontvangen. Laat nu je partner inloggen met DigiD om zijn/haar gegevens te
                  bevestigen.
                </Paragraph>
                <ButtonGroup>
                  <UtrechtDigidButton>
                    <ButtonLink appearance="primary-action-button">
                      Partner inloggen met DigiD <UtrechtIconArrow />
                    </ButtonLink>
                  </UtrechtDigidButton>

                  <Button
                    onClick={() =>
                      push(
                        `/gateway-login?redirectUrl=/persoonsgegevens/persoon?huwelijkId=${marriageOptions.huwelijk.id}`
                      )
                    }
                  >
                    Testomgeving login
                  </Button>
                </ButtonGroup>
                <Paragraph>
                  Of{" "}
                  <UtrechtLink href="/voorgenomen-huwelijk/partner/uitnodigen">
                    mail een uitnodiging aan je partner
                  </UtrechtLink>{" "}
                  om in te loggen.
                </Paragraph>
              </section>
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
