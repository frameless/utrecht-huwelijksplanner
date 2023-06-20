"use client";

import {
  Button,
  Fieldset,
  FormField,
  FormFieldDescription,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  Paragraph,
  SpotlightSection,
  Textbox,
} from "@utrecht/component-library-react";
import { addMinutes } from "date-fns";
import { redirect } from "next/navigation";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Aside, Checkbox2, OptionalIndicator, ReservationCard } from "../../../../components";
import { AddressDataList } from "../../../../components/huwelijksplanner/AddressDataList";
import { PersonalDataList } from "../../../../components/huwelijksplanner/PersonalDataList";
import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";
import { HuwelijkWithId } from "../../../../data/huwelijksplanner-state";
import { resolveEmbedded } from "../../../../embedded";
import { AssentService, HuwelijkService } from "../../../../generated";
import { useIngeschrevenpersoonGetByBsn } from "../../../../hooks/useIngeschrevenpersoonGetByBsn";
import { getBsnFromJWT } from "../../../../openapi/authentication";
import { useTranslation } from "../../../i18n/client";

type CheckType = "correct-information-and-complete" | "not-marrying-relative" | "unmarried";

type CheckboxData = {
  id: string;
  label: string;
  value: CheckType;
};

const checkboxData: CheckboxData[] = [
  {
    id: "6e562ba6-0ed3-4f4d-95e2-7f35614771b2",
    label:
      "Ik verklaar dat ik nu niet met iemand anders getrouwd ben (in Nederland of in een ander land). Ik heb nu ook geen geregistreerd partnerschap.",
    value: "unmarried",
  },
  {
    id: "03aadd3e-49ad-43a6-89f9-de574d0b92df",
    label: "Ik verklaar dat ik niet trouw met mijn neef, nicht, oom of tante.",
    value: "not-marrying-relative",
  },
  {
    id: "f65c0e93-d550-4de2-a970-79df86269f5c",
    label: "De gegevens die hierboven staan kloppen en zijn compleet.",
    value: "correct-information-and-complete",
  },
];

interface DeclarationCheckboxGroupProps {
  checkboxData: CheckboxData[];
  register: UseFormRegister<FormData>;
}

type FormData = {
  "correct-information-and-complete": boolean;
  "not-marrying-relative": boolean;
  unmarried: boolean;
  email?: string;
  phoneNumber?: string;
};

const mapToContactObject = (email?: string, phoneNumber?: string) => {
  const contactObject: any = {};

  if (email) {
    contactObject.emails = [
      {
        naam: email,
        email: email,
      },
    ];
  }

  if (phoneNumber) {
    contactObject.telefoonnummers = [
      {
        naam: phoneNumber,
        telefoonnummer: phoneNumber,
      },
    ];
  }

  return contactObject;
};

const getResultsChecklist = () => {
  return [
    {
      display: "Ik verklaar dat ik niet trouw met mijn neef, nicht, oom of tante.",
      result: true,
    },
    {
      display:
        "Ik verklaar dat ik nu niet met iemand anders getrouwd ben (in Nederland of in een ander land). Ik heb nu ook geen geregistreerd partnerschap.",
      result: true,
    },
  ];
};

export const PersonContext = ({ person, locale }: { person: string; locale: string }) => {
  const { t } = useTranslation(locale, ["huwelijksplanner-step-4", "form", "common"]);
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [persoonData] = useIngeschrevenpersoonGetByBsn(getBsnFromJWT());

  const { reservation, ambtenaar, productId } = marriageOptions;
  const [loading, setLoading] = useState(false);
  const pageInitialized = useRef(false);
  const initializeMarriage = useCallback(() => {
    if (!reservation) return;

    setLoading(true);

    const postBody = {
      requestBody: {
        type: productId,
        ceremonie: reservation["ceremony-id"],
        moment: reservation["ceremony-start"],
        ambtenaar: ambtenaar,
        locatie: reservation["ceremony-location"],
      },
    };

    HuwelijkService.huwelijkPostItem(postBody)
      .then((response) => {
        const result = resolveEmbedded(response) as HuwelijkWithId;
        setMarriageOptions({
          ...marriageOptions,
          id: result._id || "",
          partners: [...result.partners],
          reservation: {
            ...reservation,
            "ceremony-end": addMinutes(new Date(result.moment || ""), 15).toString(),
            "ceremony-price-currency": result.kosten?.split(" ")[0] || "EUR",
            "ceremony-price-amount": result.kosten?.split(" ")[1] || "-",
          },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ambtenaar, marriageOptions, productId, reservation, setMarriageOptions]);

  useEffect(() => {
    if (pageInitialized.current || !reservation) return;

    if (!marriageOptions.id) {
      initializeMarriage();
      pageInitialized.current = true;
    }
  }, [person, initializeMarriage, marriageOptions, reservation, setMarriageOptions]);

  const onContactDetailsSubmit = (data: FormData) => {
    if (person) {
      HuwelijkService.huwelijkPatchItem({
        id: person as string,
        requestBody: {
          partners: [
            {
              requester: getBsnFromJWT(),
              contact: {
                subjectIdentificatie: {
                  inpBsn: getBsnFromJWT(),
                },
                ...mapToContactObject(data.email, data.phoneNumber),
              },
              results: getResultsChecklist(),
            },
          ],
        },
      }).then(() => {
        redirect(`/persoonsgegevens/succes?huwelijkId=${person}`);
      });
    } else {
      AssentService.assentPatchItem({
        id: marriageOptions.partners[0]._self.id as string,
        requestBody: {
          requester: getBsnFromJWT(),
          contact: {
            subjectIdentificatie: {
              inpBsn: getBsnFromJWT(),
            },
            ...mapToContactObject(data.email, data.phoneNumber),
          },
          results: getResultsChecklist(),
          name: "",
        },
      }).then(() => {
        redirect("/voorgenomen-huwelijk/partner");
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onContactDetailsSubmit)}>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {loading ? (
        <Skeleton height={"50px"} />
      ) : (
        reservation && <ReservationCard reservation={reservation} locale={locale} />
      )}
      <section>
        {/*TODO: Banner / card */}
        <SpotlightSection type="info">
          <Heading2>Gegevens uit Basisregistratie Personen</Heading2>
          <Paragraph>
            Hieronder zie je de gegevens die bij ons bekend zijn. Klopt er iets niet?{" "}
            <Link href="https://pki.utrecht.nl/Loket/product/499c98cd12284d9c6bfe658dd0ea95cb">
              Neem contact op met de gemeente
            </Link>
            .
          </Paragraph>
        </SpotlightSection>
        <Heading2 id="personal-details">Persoonsgegevens</Heading2>
        {persoonData ? <PersonalDataList partner={persoonData} locale={locale} /> : <Skeleton height="100px" />}
        <Heading2 id="address">Adresgegevens</Heading2>
        {persoonData ? <AddressDataList partner={persoonData} /> : <Skeleton height="100px" />}
        <Heading2 id="contact">Contactgegevens</Heading2>
        <p>Deze gegevens kun je zelf invullen of wijzigen.</p>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="tel">
              {t("tel")} <OptionalIndicator title={t("optional")} />
            </FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id="tel"
            type="tel"
            autoComplete="tel"
            {...register("phoneNumber")}
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="email">
              {t("email")} <OptionalIndicator title={t("optional")} />
            </FormLabel>
          </p>
          <FormFieldDescription id="email-description">
            We sturen je een bevestiging naar dit e-mailadres.
            <br />
            De mail heeft een link om nog veranderingen door te geven.
          </FormFieldDescription>
          <Textbox
            className="utrecht-form-field__input"
            id="email"
            type="email"
            autoComplete="email"
            aria-describedby="email-description"
            {...register("email")}
          />
        </FormField>
        <DeclarationCheckboxGroup register={register} checkboxData={checkboxData} />
        <Button disabled={!formState.isValid || loading} type="submit" name="type" appearance="primary-action-button">
          Contactgegevens opslaan
        </Button>
      </section>
      <Aside>
        <Heading2>Meer informatie</Heading2>
        <Paragraph>
          Je mag in Nederland trouwen met je neef, nicht, oom of tante. Je moet dan wel komen verklaren dat je niet
          gedwongen wordt. Neem contact op met de gemeente: <Link href="tel:14030">bel 14 030</Link> of{" "}
          <Link href="https://www.utrecht.nl/contact/">chat met ons</Link>.
        </Paragraph>
        <Paragraph>
          <Link href="https://www.rijksoverheid.nl/onderwerpen/huwelijksdwang/huwelijksdwang-voorkomen">
            Aanpak huwelijksdwang
          </Link>
        </Paragraph>
        <Paragraph>
          <Link href="https://pki.utrecht.nl/Loket/product/499c98cd12284d9c6bfe658dd0ea95cb">
            Wat kan ik doen als mijn gegevens niet kloppen?
          </Link>
        </Paragraph>
      </Aside>
    </form>
  );
};

interface DeclarationCheckboxGroupProps {
  checkboxData: CheckboxData[];
  register: UseFormRegister<FormData>;
}

export const DeclarationCheckboxGroup = ({ checkboxData, register }: DeclarationCheckboxGroupProps) => {
  return (
    <Fieldset>
      {checkboxData &&
        checkboxData.length > 0 &&
        checkboxData.map(({ id, label, value }, index) => (
          <FormField key={index} type="checkbox">
            <Checkbox2 novalidate id={id} {...register(value, { required: true })} />
            <FormLabel htmlFor={id} type="checkbox">
              {label}
            </FormLabel>
          </FormField>
        ))}
    </Fieldset>
  );
};
