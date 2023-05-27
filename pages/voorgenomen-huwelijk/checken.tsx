import { UnorderedList, UnorderedListItem } from "@utrecht/component-library-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  ButtonGroup,
  ButtonLink,
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
  Surface,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { exampleState } from "../../src/data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };
  const { locale = "nl" } = useRouter();

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-5:title")} - ${t("common:website-name")}`}</title>
        </Head>
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
                {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale} /> : ""}
                <section>
                  <Heading2>Gelukt</Heading2>
                  <Paragraph>De gemeente heeft de volgende punten gecontroleerd:</Paragraph>
                  <UnorderedList>
                    <UnorderedListItem>Jullie zijn beide 18 jaar of ouder</UnorderedListItem>
                    <UnorderedListItem>
                      Jullie zijn niet met iemand anders getrouwd of hebben een geregistreerd partnerschap met iemand
                      anders
                    </UnorderedListItem>
                    <UnorderedListItem>Jullie staan niet onder curatele</UnorderedListItem>
                    <UnorderedListItem>
                      Jullie zijn geen directe familie van elkaar (ouder en kind, grootouder en kleinkind, broer en zus)
                    </UnorderedListItem>
                  </UnorderedList>
                  <Heading2>Jullie hebben verklaard dat:</Heading2>
                  <UnorderedList>
                    <UnorderedListItem>
                      Jullie nu niet met iemand anders getrouwd zijn (in Nederland of in een ander land). Jullie hebben
                      nu ook geen geregistreerd partnerschap.
                    </UnorderedListItem>
                    <UnorderedListItem>Geen neef, nicht, oom of tante van elkaar zijn.</UnorderedListItem>
                  </UnorderedList>
                  <Paragraph>Je kunt nu je reservering voor datum en tijd vastleggen door te betalen.</Paragraph>
                  <ButtonGroup>
                    <Link passHref href="/voorgenomen-huwelijk/betalen">
                      <ButtonLink appearance="primary-action-button">Ga betalen</ButtonLink>
                    </Link>
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
