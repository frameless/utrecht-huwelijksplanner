import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PropsWithChildren } from "react";
import {
  Document,
  Heading1,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  Surface,
} from "../src/components";
import { PageFooterTemplate } from "../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../src/components/huwelijksplanner/PageHeaderTemplate";
import { exampleState } from "../src/data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-cancelled", "huwelijksplanner", "form"])),
  },
});

export const HttpErrorPage = ({ status, children }: PropsWithChildren<{ status: number }>) => {
  const title = `HTTP ${status}`;
  return (
    <Surface>
      <Document>
        <Head>
          <title>{title}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <Heading1>{title}</Heading1>
              {children}
            </PageContentMain>
          </PageContent>
        </Page>
      </Document>
    </Surface>
  );
};

export default function MultistepForm1() {
  const { t } = useTranslation(["huwelijksplanner-cancelled", "huwelijksplanner", "form"]);
  const data = { ...exampleState };

  if (!data.cancelled) {
    return (
      <HttpErrorPage status={500}>
        <Paragraph>Het huwelijk is niet geannuleerd, deze pagina is niet van toepassing.</Paragraph>
      </HttpErrorPage>
    );
  }
  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-cancelled:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <Heading1>{t("huwelijksplanner-cancelled:heading-1")}</Heading1>
              <Paragraph>We sturen jullie en de getuigen een e-mail over deze annulering.</Paragraph>
              <Paragraph>
                Binnen 10 werkdagen zal het bedrag dat je voor de reservering hebt betaald weer op je rekening staan.
              </Paragraph>
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
