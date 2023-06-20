"use client";

import { FormLabel } from "@utrecht/component-library-react";
import { addWeeks, addYears, endOfMonth, format, startOfMonth } from "date-fns";
import _ from "lodash";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import {
  Aside,
  Button,
  ButtonGroup,
  Calendar,
  DateValue,
  Fieldset,
  FieldsetLegend,
  FormField,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  Paragraph,
  RadioButton2,
  TimeValue,
  UtrechtIconArrow,
} from "../../../../components";
import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";
import { RegistrationType } from "../../../../data/huwelijksplanner-state";
import { SdgproductService } from "../../../../generated";
import { useAvailabilitycheckGetCollection } from "../../../../hooks/useAvailabilitycheckGetCollection";
import { CeremonyData, useSdgProductGetItem } from "../../../../hooks/useSdgProductGetItem";
import { useTranslation } from "../../../i18n/client";

type CalendarData = {
  start: Date;
  end: Date;
  selectedDate?: Date;
};
const dateFormat = "yyyy-MM-dd";

export const ButtWeddingOptionsContext = ({ locale }: { locale: string }) => {
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const { push } = useRouter();
  const onMarriageOptionSubmit = (weddingType: RegistrationType) => {
    SdgproductService.sdgproductGetCollection({
      upnLabel: weddingType as string,
    }).then((result) => {
      const productId = result.results[0].id as string;
      setMarriageOptions({
        ...marriageOptions,
        "registration-type": weddingType,
        productId: productId,
      });
      push(`/trouw-opties/${weddingType}`);
    });
  };

  return (
    <>
      <Heading2>Wij willen trouwen</Heading2>
      <Button
        name="type"
        value="huwelijk"
        appearance="primary-action-button"
        onClick={() => onMarriageOptionSubmit("huwelijk")}
      >
        Trouwen plannen <UtrechtIconArrow />
      </Button>
      <Heading2>Wij willen een geregistreerd partnerschap</Heading2>
      <Button
        name="type"
        value="partnerschap"
        appearance="primary-action-button"
        onClick={() => onMarriageOptionSubmit("partnerschap")}
      >
        Geregistreerd partnerschap plannen
        <UtrechtIconArrow />
      </Button>
    </>
  );
};

export const PlanningFormPageContext = ({ locale }: { locale: string }) => {
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const { t } = useTranslation(locale, "huwelijksplanner-step-2");
  const [calendarData, setCalendarData] = useState<CalendarData>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
    selectedDate: undefined,
  });
  const [selectedSlot, setSelectedSlot] = useState<{ ceremony: CeremonyData; startTime: string; endTime: string }>();
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const { push } = useRouter();
  const [ceremonyData] = useSdgProductGetItem(marriageOptions.productId);
  const [availabilityData] = useAvailabilitycheckGetCollection({
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
      setSelectedSlot(undefined);
      setSelectedRadio("");
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedSlot) return;

    setMarriageOptions({
      ...marriageOptions,
      ambtenaar: selectedSlot.ceremony?.ambtenaarId,
      reservation: {
        "ceremony-id": selectedSlot.ceremony.id,
        "ceremony-type": selectedSlot.ceremony.type,
        "ceremony-location": selectedSlot.ceremony.locationId,
        "ceremony-start": selectedSlot.startTime,
        "ceremony-end": selectedSlot.endTime,
      },
    });
    push("/voorgenomen-huwelijk");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <HeadingGroup>
          <Heading1>{t("huwelijksplanner-step-2:heading-1")}</Heading1>
          <Paragraph lead>
            {t("common:step-n-of-m", { n: 2, m: 5 })} — {t("huwelijksplanner-step-2:title")}
          </Paragraph>
        </HeadingGroup>
        <Paragraph lead>
          Kies hier de datum waarop jullie willen trouwen. Als je op de datum klikt zie je de beschikbare tijden,
          plaatsen en manieren waarop je kunt trouwen.
        </Paragraph>
        <section>
          <FormField>
            <Calendar
              onCalendarClick={(date: string) => onCalendarDateSelected(new Date(date))}
              minDate={addWeeks(new Date(), 3)}
              maxDate={addYears(new Date(), 1)}
            />
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
    </>
  );
};
