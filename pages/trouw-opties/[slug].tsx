import { FormLabel, RadioButton } from "@utrecht/component-library-react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { FormEvent, useContext, useState } from "react";
import {
  Aside,
  BackLink,
  Button,
  ButtonGroup,
  Calendar,
  DateValue,
  Document,
  Fieldset,
  FieldsetLegend,
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
  TimeValue,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { useSdgProductGetItem } from "../../src/hooks/useSdgProductGetItem";
import { useAvailabilitycheckGetCollection } from "../../src/hooks/useAvailabilitycheckGetCollection";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

type CalendarData = {
  start: Date;
  end: Date;
  selectedDate?: Date;
};

type Event = {
  date: string;
  emphasis?: boolean;
  selected?: boolean;
  disabled?: boolean;
};

const dateFormat = "yyyy-MM-dd";

const PlanningFormPage: NextPage = () => {
  const { locale = "nl", replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [calendarData, setCalendarData] = useState<CalendarData>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
    selectedDate: undefined,
  });

  const [ceremonyData, ceremoniesLoading, ceremonyError] = useSdgProductGetItem(marriageOptions.productId);
  const [availabilityData, availabilityLoading, availabilityError] = useAvailabilitycheckGetCollection({
    ceremonyData: ceremonyData,
    interval: "PT2H",
    start: calendarData.start,
    stop: calendarData.end,
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const onCalendarDateSelected = (date: Date) => {
    setCalendarData({ start: startOfMonth(date), end: endOfMonth(date), selectedDate: date });
  };

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
                      //events={unavailableData}
                      onCalendarClick={(date: string) => onCalendarDateSelected(new Date(date))}
                    />
                  </FormField>
                  {calendarData.selectedDate && (
                    <div>
                      <p>
                        <DateValue dateTime={calendarData.selectedDate.toISOString()} locale={locale} />
                      </p>
                      {ceremonyData.map((ceremony, idx) => (
                        <Fieldset key={idx}>
                          <FieldsetLegend>{ceremony.type}</FieldsetLegend>
                          {calendarData.selectedDate &&
                            availabilityData[format(calendarData.selectedDate, dateFormat)]
                              ?.filter((slot) => slot.resources.includes(ceremony.id))
                              .map((slot, idx) => (
                                <FormField key={idx} type="radio">
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
                    </div>
                  )}
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
