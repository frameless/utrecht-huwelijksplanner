import { ButtonGroup, FormField, FormLabel } from "@utrecht/component-library-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useContext, useId, useState } from "react";
import { useForm } from "react-hook-form";
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
  RadioButton2,
  ReservationCard,
  Surface,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { HuwelijkService } from "../../src/generated";
import { useSdgProductGetCollection } from "../../src/hooks/useSdgProductGetCollection";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

type FormData = {
  "marriage-certificate-kind": string;
};

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const { locale = "nl", push } = useRouter();
  const [certificate, productLoading] = useSdgProductGetCollection("trouwboekje");
  const { register, handleSubmit } = useForm<FormData>();
  const reservation = marriageOptions.reservation;
  const [saving, setSaving] = useState(false);

  const certificateRadioName = "marriage-certificate-kind";
  const noCertificateId = useId();

  const onMarriageCertificateKindSubmit = (formData: FormData) => {
    if (formData["marriage-certificate-kind"] === "none") {
      push("/voorgenomen-huwelijk/checken");
      return;
    }

    if (!reservation) return;

    setSaving(true);

    HuwelijkService.huwelijkPatchItem({
      id: marriageOptions.id as string,
      requestBody: {
        producten: [formData["marriage-certificate-kind"]],
      },
    })
      .then(({ kosten }) => {
        setMarriageOptions({
          ...marriageOptions,
          reservation: {
            ...reservation,
            "ceremony-price-amount": kosten ? kosten.replace("EUR ", "") : "-",
          },
        });
        push("/voorgenomen-huwelijk/checken");
      })
      .finally(() => setSaving(false));
  };

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
              <form onSubmit={handleSubmit(onMarriageCertificateKindSubmit)}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {marriageOptions.reservation && (
                  <ReservationCard reservation={marriageOptions.reservation} locale={locale} />
                )}
                <section>
                  <Heading2>Kies je extra’s</Heading2>
                  <Paragraph>
                    Een trouwboekje hoort niet meer standaard bij een huwelijk. Je kunt het wel bestellen als extra -
                    dan is het een mooie aandenken aan jullie trouwdag.
                  </Paragraph>
                  {productLoading ? (
                    <Skeleton height={"250px"} />
                  ) : (
                    <Fieldset style={{ width: "fit-content" }}>
                      <FieldsetLegend>Trouwboekje</FieldsetLegend>
                      <Paragraph>
                        <Image src="/img/voorbeeld-trouwboekjes.jpg" width={600} height={385} alt="trouwboekjes" />
                      </Paragraph>
                      <FormField type="radio">
                        <Paragraph className="utrecht-form-field__label utrecht-form-field__label--radio">
                          <FormLabel htmlFor={noCertificateId} type="radio">
                            <RadioButton2
                              className="utrecht-form-field__input"
                              id={noCertificateId}
                              defaultChecked={true}
                              value={"none"}
                              {...register(certificateRadioName)}
                            />
                            Nee, wij willen geen trouwboekje
                          </FormLabel>
                        </Paragraph>
                      </FormField>
                      {certificate &&
                        certificate.vertalingen.map(
                          (vertaling: { id: string; specifiekeTekst: string; kosten: string }) => (
                            <FormField key={vertaling.id} type="radio">
                              <Paragraph className="utrecht-form-field__label utrecht-form-field__label--radio">
                                <FormLabel htmlFor={vertaling.id} type="radio">
                                  <RadioButton2
                                    className="utrecht-form-field__input"
                                    id={vertaling.id}
                                    value={vertaling.id}
                                    {...register(certificateRadioName)}
                                  />
                                  {vertaling.specifiekeTekst} ({vertaling.kosten})
                                </FormLabel>
                              </Paragraph>
                            </FormField>
                          )
                        )}
                    </Fieldset>
                  )}
                </section>
                <ButtonGroup>
                  <Button
                    disabled={saving || productLoading}
                    type="submit"
                    name="type"
                    appearance="primary-action-button"
                  >
                    Bevestigen
                  </Button>
                </ButtonGroup>
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
