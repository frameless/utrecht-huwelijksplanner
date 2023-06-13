import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
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
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { MollieService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5"])),
  },
});

const Betalen: NextPage = () => {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5"]);
  const [error, setError] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const [marriageOptions] = useContext(MarriageOptionsContext);
  const { id } = marriageOptions;

  useEffect(() => {
    if (!id || loading) return;

    setLoading(true);
    MollieService.mollieGetCollection({
      resource: id,
    })
      .then((res: any) => {
        const path = new URL(res.redirectUrl).pathname;
        push(`${path}?paymentId=${res.paymentId}`);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, loading, push]);

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
              <section>{error ? <PaymentError /> : <p>Je wordt doorgestuurd naar de betaling</p>}</section>
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

const PaymentError = () => {
  return (
    <>
      <p>
        Er is iets misgegaan. Klik <Link href={"/"}>hier</Link> om terug te gaan naar de startpagina
      </p>
    </>
  );
};

export default Betalen;
