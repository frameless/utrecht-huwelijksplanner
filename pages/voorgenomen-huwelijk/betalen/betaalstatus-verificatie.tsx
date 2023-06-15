import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import {
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
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MollieService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5"])),
  },
});

const Betalen = () => {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5"]);
  const { push, query } = useRouter();
  const { paymentId } = query;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!paymentId) return;

    setIsLoading(true);

    MollieService.mollieGetItem({ id: paymentId as string }).then((res) => {
      if (res.status === "paid") {
        setIsLoading(false);
        setTimeout(() => push("/voorgenomen-huwelijk/betalen/succes"), 2000);
      }
    });
  }, [paymentId, push]);

  const content = isLoading ? (
    <Paragraph>Betaling verifiëren, even geduld...</Paragraph>
  ) : (
    <Paragraph>Betaling voltooid, je wordt doorgestuurd...</Paragraph>
  );

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 5 })}: ${t("huwelijksplanner-step-5:title")} - ${t(
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
                <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                <Paragraph lead>{t("common:step-n-of-m", { n: 5, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
              </HeadingGroup>
              <section>{content}</section>
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <PageFooterTemplate />
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
};

export default Betalen;
