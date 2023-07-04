"use client";
import { addWeeks, addYears, endOfMonth, format, startOfMonth } from "date-fns";
import _ from "lodash";
import { ChangeEvent, useState } from "react";
import {
  Aside,
  Button,
  ButtonGroup,
  Calendar,
  DateValue,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  Paragraph,
  RadioButton2,
  TimeValue,
} from "../../../../components";
import { useAvailabilitycheckGetCollection } from "../../../../hooks/useAvailabilitycheckGetCollection";
import { CeremonyData, useSdgProductGetItem } from "../../../../hooks/useSdgProductGetItem";
import { useTranslation } from "../../../i18n/client";
type CalendarData = {
  start: Date;
  end: Date;
  selectedDate?: Date;
};

interface FormProps {
  onActionHandler?: (formData: FormData) => void;
  locale: string;
  productId: string;
}

const dateFormat = "yyyy-MM-dd";

export const Form = ({ onActionHandler, locale, productId }: FormProps) => {
  const { t } = useTranslation(locale, ["huwelijksplanner-step-4", "form", "common"]);
  const [ceremonyData] = useSdgProductGetItem(productId);
  const [selectedSlot, setSelectedSlot] = useState<{ ceremony: CeremonyData; startTime: string; endTime: string }>();
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const [calendarData, setCalendarData] = useState<CalendarData>({
    start: startOfMonth(Date.now()),
    end: endOfMonth(Date.now()),
    selectedDate: undefined,
  });
  const [availabilityData] = useAvailabilitycheckGetCollection({
    ceremonyData: ceremonyData,
    interval: "PT2H",
    start: calendarData.start,
    stop: calendarData.end,
  });

  const onCalendarDateSelected = (date: Date) => {
    setCalendarData({ start: startOfMonth(date), end: endOfMonth(date), selectedDate: date });
    if (calendarData.selectedDate !== date) {
      setSelectedSlot(undefined);
      setSelectedRadio("");
    }
  };

  const onRadioChange = (
    event: ChangeEvent<HTMLInputElement>,
    slotData: { ceremony: CeremonyData; start: string; end: string }
  ) => {
    if (!event.target.checked) return;

    setSelectedRadio(event.target.id);
    setSelectedSlot({ ceremony: slotData.ceremony, startTime: slotData.start, endTime: slotData.end });
  };

  return (
    <form action={onActionHandler}>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        <Paragraph lead>
          {t("step-n-of-m", { n: 2, m: 5 })} — {t("title")}
        </Paragraph>
      </HeadingGroup>
      <Paragraph lead>
        Kies hier de datum waarop jullie willen trouwen. Als je op de datum klikt zie je de beschikbare tijden, plaatsen
        en manieren waarop je kunt trouwen.
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
                                value={ceremony.id}
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
  );
};
