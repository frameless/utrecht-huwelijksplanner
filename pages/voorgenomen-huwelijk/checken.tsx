import { UnorderedList, UnorderedListItem } from "@utrecht/component-library-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
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
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { HuwelijkService } from "../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const locale = useRouter().locale || "en";

  const [marriageOptions] = useContext(MarriageOptionsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [checkedItems, setCheckedItems] = useState<any[]>([]);
  const [uncheckedItems, setUncheckedItems] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);

    HuwelijkService.huwelijkGetItem(marriageOptions.huwelijk.id)
      .then((res) => {
        const {
          // @ts-ignore
          embedded: {
            checklist: { embedded: items },
          },
        } = res;

        setCheckedItems(Object.values(items).filter((item: any) => item.result));
        setUncheckedItems(Object.values(items).filter((item: any) => !item.result));
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                <ReservationCard locale={locale} />

                {isLoading && <Skeleton height="200px" />}

                {!isLoading && (
                  <section>
                    <Heading2>Gelukt</Heading2>
                    <Paragraph>De gemeente heeft de volgende punten gecontroleerd:</Paragraph>

                    <UnorderedList>
                      {/* @ts-ignore */}
                      {checkedItems.map((item, idx) => (
                        <UnorderedListItem key={idx}>{item.display}</UnorderedListItem>
                      ))}
                    </UnorderedList>

                    <Heading2>Niet gelukt</Heading2>
                    <Paragraph>De gemeente heeft de volgende punten niet kunnen controleren:</Paragraph>

                    <UnorderedList>
                      {/* @ts-ignore */}
                      {uncheckedItems.map((item, idx) => (
                        <UnorderedListItem key={idx}>{item.display}</UnorderedListItem>
                      ))}
                    </UnorderedList>

                    <Heading2>Jullie hebben verklaard dat:</Heading2>
                    <UnorderedList>
                      <UnorderedListItem>
                        Jullie nu niet met iemand anders getrouwd zijn (in Nederland of in een ander land). Jullie
                        hebben nu ook geen geregistreerd partnerschap.
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
                )}
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
