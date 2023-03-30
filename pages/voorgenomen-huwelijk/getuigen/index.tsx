import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useId, useState } from "react";
import { useForm } from "react-hook-form";
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
  SkipLink,
  Surface,
  Textbox,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { Huwelijk, HuwelijkService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-getuigen", "form"])),
  },
});


export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-getuigen", "form"]);
  const { push, locale } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm();
  const [marriageOptions] = useContext(MarriageOptionsContext);

  const onWitnessSubmit = (data: any) => {
    setIsLoading(true);

    HuwelijkService.huwelijkPatchItem(marriageOptions.huwelijk.id, { getuigen: mapGetuigen(data) } as Huwelijk).then(() => {
      push("/voorgenomen-huwelijk/getuigen/succes");
      setIsLoading(false);
    })
  };


  const WitnessFieldset = ({ index }: { index: number; }) => {
    const witnessId = useId();
    const nameId = useId();
    const emailId = useId();

    return (
      <Fieldset>
        {/* TODO: Allow submitting only the first witness, there is time left to think of the second person */}
        <FieldsetLegend>
          {t("form:legal-witness")} {index}
        </FieldsetLegend>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={nameId}>{t("form:name")}</FormLabel>
          </p>
          <Textbox
            disabled={isLoading}
            id={nameId}
            type="text"
            autoComplete={`name ${witnessId}`}
            {...register(`getuige-${index}-naam}`, { required: index <= 2 })}
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={emailId}>{t("form:email")}</FormLabel>
          </p>
          <Textbox
            disabled={isLoading}
            id={emailId}
            type="email"
            autoComplete={`email ${witnessId}`}
            {...register(`getuige-${index}-email}`, { required: index <= 2 })}
          />
        </FormField>
      </Fieldset>
    );
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
              <ReservationCard locale={locale || "en"} />
              <section>
                <form onSubmit={handleSubmit(onWitnessSubmit)} aria-labelledby={formHeaderId}>
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
                  {/* <div>
                    <Button type="submit">Later uitnodigen</Button>
                  </div> */}
                  <ButtonGroup>
                    <Button disabled={isLoading} appearance="primary-action-button" type="submit">
                      {isLoading ? "Loading..." : "Verstuur uitnodiging"}
                    </Button>
                  </ButtonGroup>
                </form>
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

const mapGetuigen = (data: any) => {
  const getuigen = Array.from({ length: 4 }, (_, i) => {
    const naam = data[`getuige-${i+1}-naam}`];
    const email = data[`getuige-${i+1}-email}`];

    if (naam && email) {
      return {
        name: naam,
        requester: null,
        contact: {
          voornaam: naam,
          emails: [{ naam, email }]
        }
      };
    }

    return undefined;
  }).filter(Boolean);

  return getuigen.filter((g) => g);
}
