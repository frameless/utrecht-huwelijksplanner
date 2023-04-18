/* eslint-disable no-console */
import { FormField, FormLabel } from "@utrecht/component-library-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Button,
  Document,
  Fieldset,
  FieldsetLegend,
  Heading1,
  Heading2,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  Surface,
} from "../../src/components";
import { Checkbox2, RadioButton2 } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { SdgproductService } from "../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const { locale, push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [trouwboekje, setTrouwboekje] = useState<any>();
  const [selectedExtra, setSelectedExtra] = useState<any>();

  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);

  const onMarriageCertificateKindSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMarriageOptions({...marriageOptions, extras: [selectedExtra]});

    push("/voorgenomen-huwelijk/checken");
  };

  useEffect(() => {
    setIsLoading(true);

    SdgproductService.sdgproductGetCollection(undefined, undefined, undefined, "trouwboekje")
      .then((res) => {
        setTrouwboekje(res.results[0]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-5:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <form onSubmit={onMarriageCertificateKindSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                <ReservationCard locale={locale || "en"} />
                <section>
                  <Heading2>Kies je extra’s</Heading2>
                  <Paragraph>
                    Een trouwboekje hoort niet meer standaard bij een huwelijk. Je kunt het wel bestellen als extra -
                    dan is het een mooie aandenken aan jullie trouwdag.
                  </Paragraph>

                  {isLoading && <Skeleton height="200px" />}

                  {!isLoading && trouwboekje && (
                    <>
                      <Fieldset style={{ width: "fit-content" }}>
                        <FieldsetLegend>{trouwboekje.upnLabel}</FieldsetLegend>
                        <Paragraph>
                          <Image src="/img/voorbeeld-trouwboekjes.jpg" width={600} height={385} alt="trouwboekjes" />
                        </Paragraph>

                        <FormField type="checkbox">
                          <Checkbox2 id="marriage-certificate-agreement" />
                          <FormLabel htmlFor="marriage-certificate-agreement" type="checkbox">
                            Ja, wij willen een trouwboekje
                          </FormLabel>
                        </FormField>

                        {trouwboekje.embedded.vertalingen.map((vertaling: any) => (
                          <FormField key={vertaling.id} type="radio">
                            <RadioButton2 onChange={() => setSelectedExtra(vertaling.id)} id={vertaling.id} name="marriage-certificate-kind" />
                            <FormLabel htmlFor={vertaling.id} type="radio">
                              {vertaling.specifiekeTekst} ({vertaling.kosten})
                            </FormLabel>
                          </FormField>
                        ))}
                      </Fieldset>
                      <Button type="submit" name="type" appearance="primary-action-button">
                        Deze wil ik hebben
                      </Button>
                    </>
                  )}
                </section>
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
}
