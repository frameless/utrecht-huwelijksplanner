import { endOfMonth, format, startOfMonth } from "date-fns";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import {
  Aside,
  BackLink,
  Button,
  ButtonGroup,
  Calendar,
  Document,
  FormField,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  Surface,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import {AvailabilitycheckService, SDGProduct, SdgproductService} from "../../src/generated";
import { CeremonyType } from "../../src/data/huwelijksplanner-state";
import {resolveEmbedded} from "../../src/embedded";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

interface CalendarRange {
  start: Date;
  end: Date;
}

interface CeremonyData {
  type: CeremonyType;
  id: string;
  locationId: string;
  ambtenaarId: string;
}

const PlanningFormPage: NextPage = () => {
  const { locale = "nl", replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [ceremonies, setCeremonies] = useState<CeremonyData[]>([]);

  const [calendarRange, setCalendarRange] = useState<CalendarRange>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
  });

  const loadEvents = useCallback(() => {
    if(ceremonies.length == 0) return;
    AvailabilitycheckService.availabilitycheckGetCollection({
      resourcesCould: ceremonies.map(ceremony => ceremony.id),
      interval: "PT2H",
      start: format(calendarRange.start, "yyyy-MM-dd"),
      stop: format(calendarRange.end, "yyyy-MM-dd"),
    }).then((result) => {});
  }, [ceremonies, calendarRange]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {};

  const onCalendarDateSelected = (date: Date) => {
    setCalendarRange({ start: startOfMonth(date), end: endOfMonth(date) });
  };

  useEffect(() => {
    if (!marriageOptions.productId) replace("/trouw-opties/");

    SdgproductService.sdgproductGetItem({ id: marriageOptions.productId as string })
      .then((result) => {
        result = resolveEmbedded(result);
        setCeremonies(result.gerelateerdeProducten.map((ceremony: SDGProduct) => ({
          id: ceremony.id,
          name: ceremony.upnLabel,
          locationId: ceremony.gerelateerdeProducten[0].id,
          ambtenaarId: ceremony.gerelateerdeProducten[0].gerelateerdeProducten[0].id
        })))
      });
  }, [marriageOptions.productId]);

  useEffect(() => {
    loadEvents();
  }, [calendarRange]);

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 2 })}: ${t("huwelijksplanner-step-2:title")} - ${t(
            "common:website-name"
          )}`}</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <BackLink href="/trouw-opties/">← Terug</BackLink>
            <PageContentMain>
              <form onSubmit={onSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-2:heading-1")}</Heading1>
                  <Paragraph lead>
                    {t("common:step-n-of-m", { n: 2, m: 5 })} — {t("huwelijksplanner-step-2:title")}
                  </Paragraph>
                </HeadingGroup>
                <Paragraph lead>
                  Kies hier de datum waarop jullie willen trouwen. Als je op de datum klikt zie je de beschikbare
                  tijden, plaatsen en manieren waarop je kunt trouwen.
                </Paragraph>
                <section>
                  <FormField>
                    <Calendar onCalendarClick={(date: string) => onCalendarDateSelected(new Date(date))} />
                  </FormField>
                  <ButtonGroup>
                    <Button type="submit" appearance="primary-action-button">
                      Ja, dit wil ik!
                    </Button>
                  </ButtonGroup>
                </section>
                <Aside>
                  <Heading2>Meer informatie</Heading2>
                  <Paragraph>
                    <Link href="/" external>
                      Trouwen of partnerschap registreren in Utrecht
                    </Link>
                  </Paragraph>
                </Aside>
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
};

export default PlanningFormPage;
