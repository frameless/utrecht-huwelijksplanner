import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
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
import { calendars, CeremonyType } from "../../src/data/huwelijksplanner-state";
import { Availability } from "../../src/generated/openapi/Agenda-Service";
import { HuwelijksplannerAPI } from "../../src/openapi/index";
export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

const BlogPost: NextPage = () => {
  const { locale = "nl", push } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);

  const getEvents = (type: CeremonyType, date: string) => {
    return calendars[type as keyof typeof calendars].filter((event) => event.startDateTime.startsWith(date));
  };

  const [, setResults] = useState<Availability[]>([]);

  const [selectedDate, setSelectedDate] = useState("2021-04-14");
  const [selectedLocationAndDate, setSelectedLocationAndDate] = useState<string | undefined>();

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

  const onChangeDateHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedLocationAndDate(event.target.value);
  };

  const onSelectedDateAndLocationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = {
    //   trouw_optie: query.slug,
    //   locatie_id: selectedLocationAndDate,
    // };

    if (selectedLocationAndDate) {
      push("/voorgenomen-huwelijk");
    } else {
      throw new Error("please, select a date!");
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
                    <Calendar onCalendarClick={(date: string) => setSelectedDate(date)} />
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
                          onChange={onChangeDateHandler}
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
