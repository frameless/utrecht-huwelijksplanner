import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import {
  Aside,
  Button,
  ButtonGroup,
  ButtonLink,
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
  RadioButton,
  SkipLink,
  Surface,
  TimeValue,
} from "../../src/components";
import { DateInput } from "../../src/components/DateInput";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { calendars, CeremonyType } from "../../src/data/huwelijksplanner-state";
import { Availability } from "../../src/generated/openapi/Agenda-Service";
import { HuwelijksplannerAPI } from "../../src/openapi/index";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

const BlogPost: NextPage = () => {
  const { query, locale = "nl", push } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);

  const getEvents = (type: CeremonyType, date: string) => {
    return calendars[type as keyof typeof calendars].filter((event) => event.startDateTime.startsWith(date));
  };

  const [, setResults] = useState<Availability[]>([]);

  const [selectedDate, setSelectedDate] = useState("2021-04-14");
  const [selectedLocationAndDate, setSelectedLocationAndDate] = useState<string | undefined>();

  const loadEvents = useCallback(() => {
    console.log("load events for: ", selectedDate);
    const today = new Date().toISOString().replace(/T.+/, "");
    HuwelijksplannerAPI.getAvailability({
      interval: "PT1H",
      start: today,
    }).then((data) => {
      setResults(data);
    });
  }, [selectedDate]);

  useEffect(() => {
    loadEvents();
  }, [selectedDate]);

  const onChangeDateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocationAndDate(event.target.value);
  };

  const onSelectedDateAndLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      trouw_optie: query.slug,
      locatie_id: selectedLocationAndDate,
    };
    console.log(data);
    if (selectedLocationAndDate) {
      push("/voorgenomen-huwelijk");
    } else {
      console.log("please, select a date!");
    }
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
              <ButtonLink href="/trouw-opties/" appearance="subtle-button">
                ← Terug
              </ButtonLink>
            </ButtonGroup>
            <PageContentMain>
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
                    <FormLabel htmlFor="date">Trouwdatum</FormLabel>
                    <DateInput
                      id="date"
                      onInput={(event) => setSelectedDate((event.target as HTMLInputElement).value)}
                      defaultValue={selectedDate}
                    />
                  </FormField>
                  <Fieldset>
                    <FieldsetLegend>Kies je datum en tijd</FieldsetLegend>
                    {/*<Fieldset>
                      <FieldsetLegend>TODO</FieldsetLegend>
                      {results.map((event) => (
                        <FormField key={event.id}>
                          <RadioButton
                            id={event.id}
                            name="event"
                            value={event.id}
                            required
                            onChange={onChangeDateHandler}
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
                    </Fieldset>*/}
                    <Fieldset>
                      <FieldsetLegend>Flits/balie-huwelijk — Stadskantoor</FieldsetLegend>
                      {getEvents("flits-balie-huwelijk", selectedDate).map((event) => (
                        <FormField key={event.id}>
                          <RadioButton
                            id={event.id}
                            name="event"
                            value={event.id}
                            required
                            onChange={onChangeDateHandler}
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
                    <Fieldset>
                      <FieldsetLegend>Uitgebreid trouwen — Zelf de plaats bepalen</FieldsetLegend>
                      {getEvents("uitgebreid-huwelijk", selectedDate).map((event) => (
                        <FormField key={event.id}>
                          <RadioButton
                            id={event.id}
                            name="event"
                            value={event.id}
                            required
                            onChange={onChangeDateHandler}
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
