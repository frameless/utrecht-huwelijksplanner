import { addWeeks, endOfMonth, format, startOfMonth } from "date-fns";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import {
  Aside,
  BackLink,
  Button,
  ButtonGroup,
  Calendar,
  Document,
  FormField,
  Fieldset,
  FieldsetLegend,
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
  Surface, TimeValue, DateValue,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { CeremonyType } from "../../src/data/huwelijksplanner-state";
import { resolveEmbedded } from "../../src/embedded";
import { AvailabilitycheckService, SDGProduct, SdgproductService } from "../../src/generated";
import _ from "lodash";
import { FormLabel, RadioButton } from "@utrecht/component-library-react";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

type CalendarData = {
  start: Date;
  end: Date;
  selectedDate: Date;
};

type CeremonyData = {
  type: CeremonyType;
  id: string;
  locationId: string;
  ambtenaarId: string;
};

type AvailabilitySlot = {
  resources: string[];
  start: string;
  stop: string;
};

type Availabilities = {
  [key: string]: Array<AvailabilitySlot>;
};

type Event = {
  date: string;
  emphasis?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

const dateFormat = "yyyy-MM-dd";

const PlanningFormPage: NextPage = () => {
  const { locale= "nl", replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [ceremonies, setCeremonies] = useState<CeremonyData[]>([]);
  const [availabilities, setAvailabilities] = useState<Availabilities>({});
  const [calendarData, setCalendarData] = useState<CalendarData>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
    selectedDate: addWeeks(Date.now(), 3),
  });
  const [unavailableData, setUnavailableData] = useState<Event[]>([]);

  const loadEvents = useCallback(() => {
    if (ceremonies.length === 0) return;
    AvailabilitycheckService.availabilitycheckGetCollection({
      resourcesCould: ceremonies.map((ceremony) => ceremony.id),
      interval: "PT2H",
      start: format(calendarData.start, dateFormat),
      stop: format(calendarData.end, dateFormat),
    }).then((response) => {
      const availabilityResults: Availabilities = response as any;
      setAvailabilities(availabilityResults);

      const unavailableEvents: Event[] = [];
      _.forEach(availabilityResults, (result, date) => {
        if (!_.some(result, (r) => r.resources.length > 0)) {
          unavailableEvents.push({
            date: date,
            disabled: true,
          });
        }
      });
      setUnavailableData(unavailableEvents);
    });
  }, [ceremonies, calendarData]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
  };

  const onCalendarDateSelected = (date: Date) => {
    setCalendarData({ start: startOfMonth(date), end: endOfMonth(date), selectedDate: date });
  };

  useEffect(() => {
    if (!marriageOptions.productId) replace("/trouw-opties/");

    SdgproductService.sdgproductGetItem({ id: marriageOptions.productId as string }).then((response) => {
      const result = resolveEmbedded(response);
      setCeremonies(
        result.gerelateerdeProducten.map((ceremony: SDGProduct) => ({
          id: ceremony.id as string,
          type: ceremony.upnLabel as CeremonyType,
          locationId: ceremony.gerelateerdeProducten[0].id,
          ambtenaarId: ceremony.gerelateerdeProducten[0].gerelateerdeProducten[0].id,
        }))
      );
    });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [calendarData.start.toISOString()]);

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
                    <Calendar
                      events={unavailableData}
                      currentDate={calendarData.selectedDate}
                      onCalendarClick={(date: string) => onCalendarDateSelected(new Date(date))}
                    />
                  </FormField>
                  <p>
                    <DateValue dateTime={calendarData.selectedDate.toISOString()} locale={locale} />
                  </p>
                  {ceremonies.map((ceremony) => (
                    <Fieldset>
                      <FieldsetLegend>{ceremony.type}</FieldsetLegend>
                      {availabilities[format(calendarData.selectedDate, dateFormat)]
                        ?.filter((slot) => slot.resources.includes(ceremony.id))
                        .map((slot, idx) => (
                          <FormField type="radio">
                            <RadioButton id={`${idx}`} value={idx} name="event" />
                            <FormLabel htmlFor={`${idx}`}>
                              <TimeValue dateTime={slot.start} locale={locale} />
                            </FormLabel>
                          </FormField>
                        ))}
                    </Fieldset>
                  ))}
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
