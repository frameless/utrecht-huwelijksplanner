import { FormFieldDescription } from "@utrecht/component-library-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { useContext, useId, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Form } from "./form";
import {
  Button,
  ButtonGroup,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  ReservationCard,
  Textbox,
} from "../../../../components";
// import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";
import { HuwelijkService } from "../../../../generated";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-getuigen"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

type Witness = {
  name: string;
  email: string;
};

type WitnessFormData = {
  submit: "invite" | "continue";
  witnesses?: Witness[];
};

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-getuigen", "form"]);
  // const [marriageOptions] = useContext(MarriageOptionsContext);
  // const formMethods = useForm<WitnessFormData>();
  // const [loading, setLoading] = useState(false);
  // const watch = formMethods.watch();

  // const hasWitnesses =
  //   (watch.witnesses &&
  //     watch.witnesses.some((witness) => {
  //       return witness.name.length > 0 || witness.email?.length > 0;
  //     })) ??
  //   false;

  // const onContinueWithoutInvite = () => {
  //   push("/voorgenomen-huwelijk/getuigen/succes");
  // };

  // const onWitnessSubmit = (formData: WitnessFormData) => {
  //   if (!formData.witnesses) {
  //     onContinueWithoutInvite();
  //     return;
  //   }

  //   let hasError = false;

  //   formData.witnesses.forEach((witness, index) => {
  //     if (witness.name && !witness.email) {
  //       formMethods.setError(`witnesses.${index}.email`, { type: "required" });
  //       hasError = true;
  //     }
  //     if (!witness.name && witness.email) {
  //       formMethods.setError(`witnesses.${index}.name`, { type: "required" });
  //       hasError = true;
  //     }
  //   });

  //   if (hasError) return;

  //   setLoading(true);
  //   HuwelijkService.huwelijkPatchItem({
  //     id: marriageOptions.id as string,
  //     requestBody: {
  //       getuigen: mapWitnesses(formData.witnesses),
  //     },
  //   }).then(() => {
  //     push("/voorgenomen-huwelijk/getuigen/succes");
  //     setLoading(false);
  //   });
  // };

  // const formHeaderId = useId();

  return (
    <>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/*TODO: Banner / card */}
      {/* {marriageOptions.reservation && <ReservationCard reservation={marriageOptions.reservation} locale={locale} />} */}
      <section>
        {/* <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onWitnessSubmit)} aria-labelledby={formHeaderId}>
            <Heading2 id={formHeaderId}>Nodig alvast getuigen uit</Heading2>
            <Paragraph>Bij je huwelijk zijn minimaal twee en maximaal vier getuigen nodig.</Paragraph>
            <Paragraph>
              Het is niet verplicht om hun namen nu al in te vullen. Uiterlijk vier weken voor je huwelijksdatum moet je
              de getuigen aanmelden.
            </Paragraph> */}
        {/*TODO: Dynamisch tonen hoe lang er nog is om getuigen aan te melden*/}
        {/* <WitnessFieldset index={1} />
            <WitnessFieldset index={2} />
            <WitnessFieldset index={3} />
            <WitnessFieldset index={4} /> */}
        {/* <ButtonGroup>
              <Button
                disabled={loading || !hasWitnesses}
                appearance="primary-action-button"
                type="submit"
                value={"invite"}
                {...formMethods.register("submit")}
              >
                Verstuur uitnodiging
              </Button>
              <Button
                type="submit"
                appearance="secondary-action-button"
                value={"continue"}
                onClick={onContinueWithoutInvite}
              >
                Later uitnodigen
              </Button>
            </ButtonGroup> */}
        {/* </form> */}
        {/* </FormProvider> */}
        <Form
          onActionHandler={async function (formData: FormData) {
            "use server";
            const witnesses_name_1 = formData.get("witnesses_1_name");
            const witnesses_nmail_1 = formData.get("witnesses_1_email");
            const witnesses_name_2 = formData.get("witnesses_2_name");
            const witnesses_nmail_2 = formData.get("witnesses_2_email");
            const witnesses_name_3 = formData.get("witnesses_3_name");
            const witnesses_nmail_3 = formData.get("witnesses_3_email");
            const witnesses_name_4 = formData.get("witnesses_4_name");
            const witnesses_nmail_4 = formData.get("witnesses_4_email");

            const witnesses = [
              {
                name: witnesses_name_1,
                requester: null,
                contact: {
                  emails: [{ naam: witnesses_name_1, email: witnesses_nmail_1 }],
                },
              },
              {
                name: witnesses_name_2,
                requester: null,
                contact: {
                  emails: [{ naam: witnesses_name_2, email: witnesses_nmail_2 }],
                },
              },
              {
                name: witnesses_name_3,
                requester: null,
                contact: {
                  emails: [{ naam: witnesses_name_3, email: witnesses_nmail_3 }],
                },
              },
              {
                name: witnesses_name_4,
                requester: null,
                contact: {
                  emails: [{ naam: witnesses_name_4, email: witnesses_nmail_4 }],
                },
              },
            ];

            HuwelijkService.huwelijkPatchItem({
              id: "marriageOptions.id",
              requestBody: {
                getuigen: witnesses,
              },
            }).then(() => {
              redirect("/voorgenomen-huwelijk/getuigen/succes");
            });
          }}
          locale={locale}
        />
      </section>
    </>
  );
}

// const mapWitnesses = (witnesses: Witness[]) => {
//   return witnesses
//     .filter((witness) => witness.name.length > 0 || witness.email.length > 0)
//     .map((witness) => {
//       const { name, email } = witness;
//       return {
//         name: name,
//         requester: null,
//         contact: {
//           voornaam: name,
//           emails: [{ naam: name, email: email }],
//         },
//       };
//     });
// };

// const WitnessFieldset = ({ index }: { index: number }) => {
//   const { t } = useTranslation(["form"]);
//   const { register, formState, watch } = useFormContext<WitnessFormData>();
//   const witnessId = useId();
//   const nameId = useId();
//   const emailId = useId();

//   const nameInvalid = !!formState.errors.witnesses?.[index]?.name;
//   const emailInvalid = !!formState.errors.witnesses?.[index]?.email;

//   return (
//     <Fieldset invalid={nameInvalid || emailInvalid}>
//       <FieldsetLegend>
//         {t("form:legal-witness")} {index}
//       </FieldsetLegend>
//       <FormField>
//         <p className="utrecht-form-field__label">
//           <FormLabel htmlFor={nameId}>{t("form:name")}</FormLabel>
//         </p>
//         {formState.errors.witnesses?.[index]?.name?.type === "required" && (
//           <FormFieldDescription invalid>{t("form:name-required")}</FormFieldDescription>
//         )}
//         <Textbox
//           id={nameId}
//           type="text"
//           autoComplete={`name ${witnessId}`}
//           invalid={nameInvalid}
//           {...register(`witnesses.${index}.name`)}
//         />
//       </FormField>
//       <FormField>
//         <p className="utrecht-form-field__label">
//           <FormLabel htmlFor={emailId}>{t("form:email")}</FormLabel>
//         </p>
//         {formState.errors.witnesses?.[index]?.email?.type === "required" && (
//           <FormFieldDescription invalid>{t("form:email-required")}</FormFieldDescription>
//         )}
//         <Textbox
//           id={emailId}
//           type="email"
//           autoComplete={`email ${witnessId}`}
//           invalid={emailInvalid}
//           {...register(`witnesses.${index}.email`)}
//         />
//       </FormField>
//     </Fieldset>
//   );
// };
