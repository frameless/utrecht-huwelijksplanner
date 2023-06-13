import { FormFieldDescription } from "@utrecht/component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useId, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import {
  Button,
  ButtonGroup,
  Document,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  ReservationCard,
  SkipLink,
  Surface,
  Textbox,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { HuwelijkService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-getuigen", "form"])),
  },
});

type Witness = {
  name: string;
  email: string;
};

type WitnessFormData = {
  submit: "invite" | "continue";
  witnesses?: Witness[];
};

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-getuigen", "form"]);
  const [marriageOptions] = useContext(MarriageOptionsContext);
  const { locale = "nl", push } = useRouter();
  const formMethods = useForm<WitnessFormData>();
  const [loading, setLoading] = useState(false);
  const watch = formMethods.watch();

  const hasWitnesses =
    (watch.witnesses &&
      watch.witnesses.some((witness) => {
        return witness.name.length > 0 || witness.email?.length > 0;
      })) ??
    false;

  const onContinueWithoutInvite = () => {
    push("/voorgenomen-huwelijk/getuigen/succes");
  };

  const onWitnessSubmit = (formData: WitnessFormData) => {
    if (!formData.witnesses) {
      onContinueWithoutInvite();
      return;
    }

    let hasError = false;

    formData.witnesses.forEach((witness, index) => {
      if (witness.name && !witness.email) {
        formMethods.setError(`witnesses.${index}.email`, { type: "required" });
        hasError = true;
      }
      if (!witness.name && witness.email) {
        formMethods.setError(`witnesses.${index}.name`, { type: "required" });
        hasError = true;
      }
    });

    if (hasError) return;

    setLoading(true);
    HuwelijkService.huwelijkPatchItem({
      id: marriageOptions.id as string,
      requestBody: {
        getuigen: mapWitnesses(formData.witnesses),
      },
    }).then(() => {
      push("/voorgenomen-huwelijk/getuigen/succes");
      setLoading(false);
    });
  };

  const formHeaderId = useId();

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 3 })}: ${t("huwelijksplanner-step-getuigen:title")} - ${t(
            "common:website-name"
          )}`}</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <HeadingGroup>
                <Heading1>{t("huwelijksplanner-step-getuigen:heading-1")}</Heading1>
                {/*TODO: Previous button */}
                {/*TODO: Step indicator component */}
                <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
              </HeadingGroup>
              {/*TODO: Banner / card */}
              {marriageOptions.reservation && (
                <ReservationCard reservation={marriageOptions.reservation} locale={locale} />
              )}
              <section>
                <FormProvider {...formMethods}>
                  <form onSubmit={formMethods.handleSubmit(onWitnessSubmit)} aria-labelledby={formHeaderId}>
                    <Heading2 id={formHeaderId}>Nodig alvast getuigen uit</Heading2>
                    <Paragraph>Bij je huwelijk zijn minimaal twee en maximaal vier getuigen nodig.</Paragraph>
                    <Paragraph>
                      Het is niet verplicht om hun namen nu al in te vullen. Uiterlijk vier weken voor je huwelijksdatum
                      moet je de getuigen aanmelden.
                    </Paragraph>
                    {/*TODO: Dynamisch tonen hoe lang er nog is om getuigen aan te melden*/}
                    <WitnessFieldset index={1} />
                    <WitnessFieldset index={2} />
                    <WitnessFieldset index={3} />
                    <WitnessFieldset index={4} />
                    <ButtonGroup>
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
                    </ButtonGroup>
                  </form>
                </FormProvider>
              </section>
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

const mapWitnesses = (witnesses: Witness[]) => {
  return witnesses
    .filter((witness) => witness.name.length > 0 || witness.email.length > 0)
    .map((witness) => {
      const { name, email } = witness;
      return {
        name: name,
        requester: null,
        contact: {
          voornaam: name,
          emails: [{ naam: name, email: email }],
        },
      };
    });
};

const WitnessFieldset = ({ index }: { index: number }) => {
  const { t } = useTranslation(["form"]);
  const { register, formState } = useFormContext<WitnessFormData>();
  const nameId = useId();
  const emailId = useId();

  const nameInvalid = !!formState.errors.witnesses?.[index]?.name;
  const emailInvalid = !!formState.errors.witnesses?.[index]?.email;

  return (
    <Fieldset invalid={nameInvalid || emailInvalid}>
      <FieldsetLegend>
        {t("form:legal-witness")} {index}
      </FieldsetLegend>
      <FormField>
        <p className="utrecht-form-field__label">
          <FormLabel htmlFor={nameId}>{t("form:name")}</FormLabel>
        </p>
        {formState.errors.witnesses?.[index]?.name?.type === "required" && (
          <FormFieldDescription invalid>{t("form:name-required")}</FormFieldDescription>
        )}
        <Textbox
          id={nameId}
          type="text"
          invalid={nameInvalid}
          autoComplete={`section-witness-${index} name`}
          {...register(`witnesses.${index}.name`)}
        />
      </FormField>
      <FormField>
        <p className="utrecht-form-field__label">
          <FormLabel htmlFor={emailId}>{t("form:email")}</FormLabel>
        </p>
        {formState.errors.witnesses?.[index]?.email?.type === "required" && (
          <FormFieldDescription invalid>{t("form:email-required")}</FormFieldDescription>
        )}
        <Textbox
          id={emailId}
          type="email"
          invalid={emailInvalid}
          autoComplete={`section-witness-${index} email`}
          {...register(`witnesses.${index}.email`)}
        />
      </FormField>
    </Fieldset>
  );
};
