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
import { cookies } from "next/headers";
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

interface FormProps {
  onActionHandler?: ((formData: globalThis.FormData) => void) | undefined;
  locale: string;
}

export const Form = ({ onActionHandler, locale }: FormProps) => {
  const { t } = useTranslation(locale, ["huwelijksplanner-step-4", "form", "common"]);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleButtonClick = async () => {
    try {
      await trigger();

      if (Object.keys(errors).length > 0) {
        // setOptimisticValidation(false);
      } else {
        // setOptimisticValidation(true);
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form action={onActionHandler}>
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
      <Button type="submit" name="type" appearance="primary-action-button" onClick={handleButtonClick}>
        Contactgegevens opslaan
      </Button>
    </form>
  );
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
  return <div>dsds</div>;
};
