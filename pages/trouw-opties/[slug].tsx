/* eslint-disable no-console */
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent, useCallback, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Aside,
  Button,
  ButtonGroup,
  ButtonLink,
  Calendar,
  Document,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormLabel,
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
import { RadioButton2 } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { calendars, CeremonyType } from "../../src/data/huwelijksplanner-state";
import { Availability, AvailabilitycheckService, SdgproductService } from "../../src/generated";
import { HuwelijksplannerAPI } from "../../src/openapi/index";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

const BlogPost: NextPage = () => {
  const { locale = "nl", replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);

  const getEvents = (type: CeremonyType, date: string) => {
    return calendars[type as keyof typeof calendars].filter((event) => event.startDateTime.startsWith(date));
  };

  const [, setResults] = useState<Availability[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().replace(/T.+/, ""));
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState<string | undefined>();
  const [selectedEndTime, setSelectedEndTime] = useState<string | undefined>();
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ceremonyIds, setCeremonyIds] = useState<string[]>([]);

  useEffect(() => {
    if (!marriageOptions.type) return;

    setIsLoading(true);

    SdgproductService.sdgproductGetItem(marriageOptions.type)
      .then((res) => {
        // @ts-ignore
        setCeremonyIds(res.embedded.gerelateerdeProducten.map((ceremony: any) => ceremony._self.id));
      })
      .finally(() => setIsLoading(false));
  }, [marriageOptions.type]);

  useEffect(() => {
    if (!ceremonyIds) return;

    ceremonyIds.forEach((ceremonyId) => {
      AvailabilitycheckService.availabilitycheckGetCollection(ceremonyId, "PT1H", selectedDate, selectedDate).then(
        (res) => console.log({ res })
      );
      // AvailabilityService.availabilityGetCollection(selectedDate, selectedDate, true, ceremonyId).then((res) => console.log({res}))
    });
  }, [ceremonyIds, selectedDate]);

  const formatDateToString = (date: any) => {
    const newDate = date.split("T")[0];
    setSelectedDate(newDate);
  };

  const loadEvents = useCallback(() => {
    const today = new Date().toISOString().replace(/T.+/, "");
    HuwelijksplannerAPI.getAvailability({
      interval: "PT1H",
      start: today,
    }).then((data) => {
      setResults(data);
    });
  }, []);

  useEffect(() => {
    loadEvents();
  }, [selectedDate, loadEvents]);

  const onChangeDateHandler = (location: string, startTime: string, endTime: string) => {
    setSelectedLocation(location);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
  };

  const onSelectedDateAndLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = {
    //   trouw_optie: query.slug,
    //   locatie_id: selectedLocation,
    // };

    if (selectedLocation && selectedStartTime && selectedEndTime && selectedDate) {
      setMarriageOptions({
        ...marriageOptions,
        location: selectedLocation,
        startTime: selectedStartTime,
        endTime: selectedEndTime,
        date: selectedDate,
      });
      replace(`/voorgenomen-huwelijk`);
    } else {
      throw new Error("please, select a date!");
    }
  };

  const back = () => {
    replace("/trouw-opties/");
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
            <ButtonGroup>
              <ButtonLink onClick={back} appearance="subtle-button">
                ← Terug
              </ButtonLink>
            </ButtonGroup>
            <PageContentMain>
              {isLoading && <Skeleton height="200px" />}

              {!isLoading && (
                <form onSubmit={onSelectedDateAndLocationSubmit}>
                  <HeadingGroup>
                    <Heading1>{t("huwelijksplanner-step-2:heading-1")}</Heading1>
                    {/*TODO: Step indicator component */}
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
                      <Calendar onCalendarClick={(date: string) => formatDateToString(date)} />
                    </FormField>
                    <Fieldset>
                      <FieldsetLegend>Flits/balie-huwelijk — Stadskantoor</FieldsetLegend>
                      {getEvents("flits-balie-huwelijk", selectedDate).map((event) => (
                        <FormField key={event.id} type="radio">
                          <RadioButton2
                            novalidate={true}
                            id={event.id}
                            name="event"
                            value={event.id}
                            required
                            onChange={() => onChangeDateHandler(event.id, event.startDateTime, event.endDateTime)}
                          />
                          <FormLabel htmlFor={event.id} type="radio">
                            <span aria-label="negen uur tot tien over negen">
                              <TimeValue dateTime={event.startDateTime} locale={locale} />
                              {" – "}
                              <TimeValue dateTime={event.endDateTime} locale={locale} />
                              {" uur"}
                            </span>
                          </FormLabel>
                        </FormField>
                      ))}
                    </Fieldset>
                    <Fieldset>
                      <FieldsetLegend>Uitgebreid trouwen — Zelf de plaats bepalen</FieldsetLegend>
                      {getEvents("uitgebreid-huwelijk", selectedDate).map((event) => (
                        <FormField key={event.id}>
                          <RadioButton2
                            novalidate={true}
                            id={event.id}
                            name="event"
                            value={event.id}
                            required
                            onChange={() => onChangeDateHandler(event.id, event.startDateTime, event.endDateTime)}
                          />
                          <FormLabel htmlFor={event.id}>
                            <span aria-label="negen uur tot tien over negen">
                              <TimeValue dateTime={event.startDateTime} locale={locale} />
                              {" – "}
                              <TimeValue dateTime={event.endDateTime} locale={locale} />
                              {" uur"}
                            </span>
                          </FormLabel>
                        </FormField>
                      ))}
                    </Fieldset>

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
              )}
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

export default BlogPost;
