import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  ButtonLink,
  Document,
  Heading1,
  Heading2,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  SpotlightSection,
  Strong,
  Surface,
  UnorderedList,
  UnorderedListItem,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../src/components";
import { PageFooterTemplate } from "../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../src/components/huwelijksplanner/PageHeaderTemplate";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-0"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-0"]);

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-0:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <form>
                <Heading1>{t("huwelijksplanner-step-0:heading-1")}</Heading1>
                <Paragraph lead>Plan een datum en tijd. En doe een officiële melding bij de gemeente.</Paragraph>
                <Paragraph>
                  <Strong>Let op:</Strong> hou je DigiD bij de hand.
                </Paragraph>
                <section>
                  <Heading2>Welke stappen kun je verwachten?</Heading2>
                  <UnorderedList>
                    <UnorderedListItem>Kies tussen trouwen en geregistreerd partnerschap</UnorderedListItem>
                    <UnorderedListItem>Kies een datum en tijd voor de bijeenkomst</UnorderedListItem>
                    <UnorderedListItem>Log in met je DigiD</UnorderedListItem>
                    <UnorderedListItem>Je partner logt ook in met DigID</UnorderedListItem>
                    <UnorderedListItem>Nodig getuigen uit</UnorderedListItem>
                    <UnorderedListItem>Betaal met iDEAL</UnorderedListItem>
                    <UnorderedListItem>Je datum is geregeld!</UnorderedListItem>
                  </UnorderedList>
                  <Paragraph>
                    <Link passHref href="/trouw-opties">
                      <ButtonLink appearance="primary-action-button">
                        Start
                        <UtrechtIconArrow />
                      </ButtonLink>
                    </Link>
                  </Paragraph>
                </section>
                <SpotlightSection aside type="info">
                  <Heading2>Meer informatie</Heading2>
                  <Paragraph>
                    <UtrechtLink href="https://www.uabc.nl/?osc=uabc" external>
                      Vindt u DigiD ingewikkeld? Bekijk dan deze uitleg over DigiD.
                    </UtrechtLink>
                  </Paragraph>
                  <Paragraph>
                    <UtrechtLink
                      href="https://www.rijksoverheid.nl/onderwerpen/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/vraag-en-antwoord/wat-is-het-verschil-tussen-een-huwelijk-geregistreerd-partnerschap-en-samenlevingscontract"
                      external
                    >
                      Wat zijn de verschillen tussen een huwelijk, geregistreerd partnerschap en een
                      samenlevingscontract?
                    </UtrechtLink>
                  </Paragraph>
                  <Paragraph>
                    <UtrechtLink href="https://example.com/#TODO" external>
                      Wat is een spoedhuwelijk en hoe kun je dat regelen?
                    </UtrechtLink>
                  </Paragraph>
                </SpotlightSection>
              </form>
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <div className="todo-page-footer__content">
              <PageFooterTemplate />
            </div>
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
}
