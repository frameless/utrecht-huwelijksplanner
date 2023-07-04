"use client";

import { ButtonGroup, FormField, FormLabel } from "@utrecht/component-library-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useId, useState } from "react";
import { useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import staticImage from "../../../../public/img/voorbeeld-trouwboekjes.jpg";
import {
  Button,
  Fieldset,
  FieldsetLegend,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  RadioButton2,
  ReservationCard,
} from "../../../../src/components";
import { MarriageOptionsContext } from "../../../../src/context/MarriageOptionsContext";
import { HuwelijkService } from "../../../../src/generated";
import { useSdgProductGetCollection } from "../../../../src/hooks/useSdgProductGetCollection";
import { useTranslation } from "../../i18n/client";

type FormData = {
  "marriage-certificate-kind": string;
};

export const ExtraContext = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "huwelijksplanner-step-5");
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [certificate, productLoading] = useSdgProductGetCollection("trouwboekje");
  const { register, handleSubmit } = useForm<FormData>();
  const reservation = marriageOptions.reservation;
  const [saving, setSaving] = useState(false);
  const { push } = useRouter();
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
    <form onSubmit={handleSubmit(onMarriageCertificateKindSubmit)}>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {marriageOptions.reservation && <ReservationCard reservation={marriageOptions.reservation} locale={locale} />}
      <section>
        <Heading2>Kies je extra’s</Heading2>
        <Paragraph>
          Een trouwboekje hoort niet meer standaard bij een huwelijk. Je kunt het wel bestellen als extra - dan is het
          een mooie aandenken aan jullie trouwdag.
        </Paragraph>
        {productLoading ? (
          <Skeleton height={"250px"} />
        ) : (
          <Fieldset style={{ width: "fit-content" }}>
            <FieldsetLegend>Trouwboekje</FieldsetLegend>
            <Paragraph>
              <Image src={staticImage} width={600} height={385} alt="trouwboekjes" />
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
              certificate.vertalingen.map((vertaling: { id: string; specifiekeTekst: string; kosten: string }) => (
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
              ))}
          </Fieldset>
        )}
      </section>
      <ButtonGroup>
        <Button disabled={saving || productLoading} type="submit" name="type" appearance="primary-action-button">
          Bevestigen
        </Button>
      </ButtonGroup>
    </form>
  );
};
