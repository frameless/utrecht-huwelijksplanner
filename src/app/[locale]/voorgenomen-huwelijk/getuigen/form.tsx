"use client";

import { experimental_useOptimistic as useOptimistic } from "react";
import { useId } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  ButtonGroup,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormFieldDescription,
  FormLabel,
  Heading2,
  Paragraph,
  Textbox,
} from "../../../../components";
import { useTranslation } from "../../../i18n/client";

interface FormProps {
  onActionHandler: (formData: FormData) => void;
  locale: string;
  witness?: number;
}

export const Form = ({ locale, onActionHandler }: FormProps) => {
  const { t } = useTranslation(locale, ["form"]);
  const witnessId = useId();
  const nameId = useId();
  const emailId = useId();
  const formHeaderId = useId();
  const witnessArray = [
    { type: "string", required: true },
    { type: "email", required: true },
    { type: "string", required: false },
    { type: "email", required: false },
  ];

  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  //   const [optimisticValidation, setOptimisticValidation] = useOptimistic(
  //     { value: false },
  //     (state: any, newValue: any) => {
  //       return {
  //         ...state,
  //         value: newValue,
  //         sending: true,
  //       };
  //     }
  //   );

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
    <form action={onActionHandler} aria-labelledby={formHeaderId}>
      <Heading2 id={formHeaderId}>Nodig alvast getuigen uit</Heading2>
      <Paragraph>Bij je huwelijk zijn minimaal twee en maximaal vier getuigen nodig.</Paragraph>
      <Paragraph>
        Het is niet verplicht om hun namen nu al in te vullen. Uiterlijk vier weken voor je huwelijksdatum moet je de
        getuigen aanmelden.
      </Paragraph>
      {/*TODO: Dynamisch tonen hoe lang er nog is om getuigen aan te melden*/}
      {witnessArray.map(({ type, required }, index) => {
        const adjustedIndex = index + 1;

        const nameInvalid = !!errors[`witnesses_${adjustedIndex}_name`]?.type;
        const emailInvalid = !!errors[`witnesses_${adjustedIndex}_email`]?.type;

        return (
          <Fieldset key={adjustedIndex} invalid={nameInvalid || emailInvalid}>
            <FieldsetLegend>
              {t("legal-witness")} {adjustedIndex}
            </FieldsetLegend>
            <FormField>
              <p className="utrecht-form-field__label">
                <FormLabel htmlFor={nameId}>{t("name")}</FormLabel>
              </p>
              {errors[`witnesses_${adjustedIndex}_name`]?.type && (
                <FormFieldDescription invalid>{t("name-required")}</FormFieldDescription>
              )}
              <Textbox
                id={nameId}
                type="text"
                autoComplete={`name ${witnessId}`}
                invalid={nameInvalid}
                {...register(`witnesses_${adjustedIndex}_name`, {
                  required: type === "string" &&
                    required && {
                      value: Object.values([errors[`witnesses_${adjustedIndex}_name`]]).length < 2,
                      message: t("name-required"),
                    },
                })}
              />
            </FormField>
            <FormField>
              <p className="utrecht-form-field__label">
                <FormLabel htmlFor={emailId}>{t("email")}</FormLabel>
              </p>
              {errors[`witnesses_${adjustedIndex}_email`]?.message && (
                <FormFieldDescription invalid>
                  {errors[`witnesses_${adjustedIndex}_email`]?.message as string}
                </FormFieldDescription>
              )}
              <Textbox
                id={emailId}
                type="email"
                autoComplete={`email ${witnessId}`}
                invalid={emailInvalid}
                {...register(`witnesses_${adjustedIndex}_email`, {
                  required: type === "email" &&
                    required && {
                      value: Object.values([errors[`witnesses_${adjustedIndex}_email`]]).length < 2,
                      message: t("email-required"),
                    },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("email-pattern"),
                  },
                })}
              />
            </FormField>
          </Fieldset>
        );
      })}

      <ButtonGroup>
        <Button
          disabled={Object.keys(errors).length > 0}
          appearance="primary-action-button"
          type="submit"
          value={"invite"}
          onClick={handleButtonClick}
        >
          Verstuur uitnodiging
        </Button>
        <Button type="submit" appearance="secondary-action-button" value={"continue"}>
          Later uitnodigen
        </Button>
      </ButtonGroup>
    </form>
  );
};
