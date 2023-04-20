import { format } from "date-fns";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent, useContext, useEffect, useState } from "react";
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
} from "../../src/components";
import { RadioButton2 } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { AvailabilitycheckService, SdgproductService } from "../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-2"])),
  },
});

const BlogPost: NextPage = () => {
  const { replace } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-2"]);

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().replace(/T.+/, ""));
  const [selectedCeremony, setSelectedCeremony] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedAmbtenaar, setSelectedAmbtenaar] = useState<string | undefined>();
  const [selectedStartTime, setSelectedStartTime] = useState<string | undefined>();
  const [selectedEndTime, setSelectedEndTime] = useState<string | undefined>();
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ceremonyTypes, setCeremonyTypes] = useState<
    { name: string; id: string; locationId: string; ambtenaarId: string }[]
  >([]);

  const [availableSlots, setAvailableSlots] = useState<[]>([]);

  useEffect(() => {
    if (!marriageOptions.type) return;

    setIsLoading(true);

    SdgproductService.sdgproductGetItem({ id: marriageOptions.type })
      .then((res) => {
        setCeremonyTypes(
          // @ts-ignore
          res.embedded.gerelateerdeProducten.map((ceremony: any) => ({
            name: ceremony.upnLabel,
            id: ceremony._self.id,
            locationId: ceremony?.embedded?.gerelateerdeProducten[0]?.id,
            ambtenaarId: ceremony?.embedded?.gerelateerdeProducten[0]?.embedded?.gerelateerdeProducten[0]?.id,
          }))
        );
      })
      .finally(() => setIsLoading(false));
  }, [marriageOptions.type]);

  useEffect(() => {
    if (!ceremonyTypes.length) return;

    const _endDate: Date = new Date(selectedDate);
    const endDate = _endDate.setDate(_endDate.getDate() + 1);

    AvailabilitycheckService.availabilitycheckGetCollection({
      resourcesCould: ceremonyTypes.map((ceremony) => ceremony.id),
      start: selectedDate,
      stop: format(endDate, "yyyy-MM-dd"),
      interval: "PT2H",
    }).then((res) => {
      // @ts-ignore
      setAvailableSlots(JSON.parse(res)[selectedDate].filter((slot: any) => slot.resources.length > 0));
    });
  }, [ceremonyTypes, selectedDate]);

  const formatDateToString = (date: any) => {
    const newDate = date.split("T")[0];
    setSelectedDate(newDate);
  };

  const onChangeDateHandler = (
    ceremonyId: string,
    location: string,
    ambtenaar: string,
    startTime: string,
    endTime: string
  ) => {
    setSelectedCeremony(ceremonyId);
    setSelectedAmbtenaar(ambtenaar);
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
        ambtenaar: selectedAmbtenaar,
        ceremonyId: selectedCeremony,
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

                    {ceremonyTypes.map((ceremonyType, idx) => (
                      <Fieldset key={idx}>
                        <FieldsetLegend>{ceremonyType.name}</FieldsetLegend>

                        {availableSlots
                          .filter((slot: any) => slot.resources.includes(ceremonyType.id))
                          .map((slot: any) => (
                            <FormField key={slot.id} type="radio">
                              <RadioButton2
                                novalidate={true}
                                id={slot.id}
                                name="event"
                                value={slot.id}
                                required
                                onChange={() =>
                                  onChangeDateHandler(
                                    ceremonyType.id,
                                    ceremonyType.locationId,
                                    ceremonyType.ambtenaarId,
                                    slot.start,
                                    slot.stop
                                  )
                                }
                              />
                              <FormLabel htmlFor={slot.id} type="radio">
                                <span aria-label="negen uur tot tien over negen">{`${slot.start} - ${slot.stop}`}</span>
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
