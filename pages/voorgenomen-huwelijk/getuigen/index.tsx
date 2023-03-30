import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEvent, FormEvent, useId, useState } from "react";
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
import { exampleState } from "../../../src/data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-getuigen", "form"])),
  },
});

type WitnessType = {
  name?: string;
  email?: string;
};

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-getuigen", "form"]);
  const data = { ...exampleState };
  const { locale, push } = useRouter();

  const [witness, setWitness] = useState<WitnessType>();

  const onWitnessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (witness) {
      push("/voorgenomen-huwelijk/getuigen/succes");
    }
  };

  const onWitnessChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWitness({ ...witness, [event.target.name]: event.target.value });
  };

  const WitnessFieldset = ({ index, onChange }: { index: number; onChange: any }) => {
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
            id={nameId}
            type="text"
            autoComplete={`name ${witnessId}`}
            name={`getuige-${index}-naam}`}
            onChange={onChange}
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={emailId}>{t("form:email")}</FormLabel>
          </p>
          <Textbox
            id={emailId}
            type="email"
            name={`getuige-${index}-email}`}
            autoComplete={`email ${witnessId}`}
            onChange={onChange}
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
                <form onSubmit={onWitnessSubmit} aria-labelledby={formHeaderId}>
                  <Heading2 id={formHeaderId}>Nodig alvast getuigen uit</Heading2>
                  <Paragraph>Bij je huwelijk zijn minimaal twee en maximaal vier getuigen nodig.</Paragraph>
                  <Paragraph>
                    Het is niet verplicht om hun namen nu al in te vullen. Uiterlijk vier weken voor je huwelijksdatum
                    moet je de getuigen aanmelden.
                  </Paragraph>
                  {/*TODO: Dynamisch tonen hoe lang er nog is om getuigen aan te melden*/}
                  <WitnessFieldset index={1} onChange={onWitnessChange} />
                  <WitnessFieldset index={2} onChange={onWitnessChange} />
                  <WitnessFieldset index={3} onChange={onWitnessChange} />
                  <WitnessFieldset index={4} onChange={onWitnessChange} />
                  {/* <div>
                    <Button type="submit">Later uitnodigen</Button>
                  </div> */}
                  <ButtonGroup>
                    <Button appearance="primary-action-button" type="submit">
                      Verstuur uitnodiging
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
