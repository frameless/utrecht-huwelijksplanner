import { format, lastDayOfMonth, startOfMonth } from "date-fns";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import {
  Aside,
  BackLink,
  Button,
  ButtonGroup,
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
  RadioButton2,
  SkipLink,
  Surface,
  TimeValue,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { CalendarEvent } from "../../src/data/huwelijksplanner-state";
import { AvailabilitycheckService } from "../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

const PlanningFormPage: NextPage = () => {
  const { locale = "nl", replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);

  const onCalendarDateSelected = (date: Date) => {
    console.log(date);

    AvailabilitycheckService.availabilitycheckGetCollection({
      interval: "PT2H",
      start: format(startOfMonth(date.getMonth()), "yyyy-MM-dd"),
      stop: format(lastDayOfMonth(date.getMonth()), "yyyy-MM-dd"),
    }).then((result) => {
      console.log(result);
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
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
