import { FormLabel } from "@utrecht/component-library-react";
import { endOfMonth, format, startOfMonth } from "date-fns";
import _ from "lodash";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
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
  RadioButton2,
  SkipLink,
  Surface,
  TimeValue,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { useAvailabilitycheckGetCollection } from "../../src/hooks/useAvailabilitycheckGetCollection";
import { CeremonyData, useSdgProductGetItem } from "../../src/hooks/useSdgProductGetItem";

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

const dateFormat = "yyyy-MM-dd";

const PlanningFormPage: NextPage = () => {
  const { locale = "nl", push } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [calendarData, setCalendarData] = useState<CalendarData>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
    selectedDate: undefined,
  });
  const [selectedSlot, setSelectedSlot] = useState<{ ceremony?: CeremonyData; startTime?: string; endTime?: string }>(
    {}
  );
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const [ceremonyData, ceremoniesLoading, ceremonyError] = useSdgProductGetItem(marriageOptions.productId);
  const [availabilityData, availabilityLoading, availabilityError] = useAvailabilitycheckGetCollection({
    ceremonyData: ceremonyData,
    interval: "PT2H",
    start: calendarData.start,
    stop: calendarData.end,
  });

  const onRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    slotData: { ceremony: CeremonyData; start: string; end: string }
  ) => {
    if (!event.target.checked) return;

    setSelectedRadio(event.target.id);
    setSelectedSlot({ ceremony: slotData.ceremony, startTime: slotData.start, endTime: slotData.end });
  };

  const onCalendarDateSelected = (date: Date) => {
    setCalendarData({ start: startOfMonth(date), end: endOfMonth(date), selectedDate: date });
    if (calendarData.selectedDate !== date) {
      setSelectedSlot({});
      setSelectedRadio("");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setMarriageOptions({
      ...marriageOptions,
      ambtenaar: selectedSlot.ceremony?.ambtenaarId,
      "ceremony-type": selectedSlot.ceremony?.type,
      "ceremony-location": selectedSlot.ceremony?.locationId,
      "ceremony-start": selectedSlot.startTime,
      "ceremony-end": selectedSlot.endTime,
    });
    push("/voorgenomen-huwelijk");
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
                    <Calendar onCalendarClick={(date: string) => onCalendarDateSelected(new Date(date))} />
                  </FormField>
                  {calendarData.selectedDate && (
                    <div>
                      {ceremonyData.map((ceremony, idx) => {
                        const legendId = `${ceremony.type}-legend`;
                        const ceremonyType = _.upperFirst(ceremony.type);
                        const ceremonyUniqueDayId = `${ceremony.id}-${calendarData.selectedDate?.toISOString()}`;
                        return (
                          <Fieldset key={idx} role={"radiogroup"} aria-describedby={legendId}>
                            <FieldsetLegend id={legendId}>{ceremonyType}</FieldsetLegend>
                            {calendarData.selectedDate &&
                              availabilityData[format(calendarData.selectedDate, dateFormat)]
                                ?.filter((slot) => slot.resources.includes(ceremony.id))
                                .map((slot, idx) => (
                                  <FormField key={idx} type="radio">
                                    <Paragraph className={"utrecht-form-field__label utrecht-form-field__label--radio"}>
                                      <FormLabel htmlFor={`${ceremonyUniqueDayId}-${idx}`} type={"radio"}>
                                        <RadioButton2
                                          className="utrecht-form-field__input"
                                          id={`${ceremonyUniqueDayId}-${idx}`}
                                          value={`${ceremonyUniqueDayId}-${idx}`}
                                          name="event"
                                          onChange={(e) =>
                                            onRadioChange(e, {
                                              ceremony: ceremony,
                                              start: slot.start,
                                              end: slot.stop,
                                            })
                                          }
                                          checked={`${ceremonyUniqueDayId}-${idx}` === selectedRadio}
                                          required
                                          novalidate
                                        />
                                        <DateValue dateTime={slot.start} locale={locale} /> van{" "}
                                        <TimeValue dateTime={slot.start} locale={locale} /> tot{" "}
                                        <TimeValue dateTime={slot.stop} locale={locale} />
                                      </FormLabel>
                                    </Paragraph>
                                  </FormField>
                                ))}
                          </Fieldset>
                        );
                      })}
                      {selectedRadio && (
                        <ButtonGroup>
                          <Button type="submit" appearance="primary-action-button">
                            Ja, dit wil ik!
                          </Button>
                        </ButtonGroup>
                      )}
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
