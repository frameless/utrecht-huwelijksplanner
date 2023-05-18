import {
  Button,
  Document,
  Fieldset,
  FormField,
  FormFieldDescription,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  Page,
  PageContent,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  SpotlightSection,
  Surface,
  Textbox,
} from "@utrecht/component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEventHandler, FormEvent, useContext, useState } from "react";
import { AddressDataList } from "./sections/AddressDataList";
import { PersonalDataList } from "./sections/PersonalDataList";
import { Aside, Checkbox2, OptionalIndicator, PageContentMain, ReservationCard } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { useIngeschrevenpersoonGetByBsn } from "../../src/hooks/useIngeschrevenpersoonGetByBsn";
import { getBsnFromJWT } from "../../src/openapi/authentication";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-4", "form"])),
  },
});

export default function MultistepForm1() {
  const [declarationCheckboxData, setDeclarationCheckboxData] = useState<any>();
  const { t } = useTranslation(["common", "huwelijksplanner-step-4", "form"]);
  const { query, locale = "nl", push } = useRouter();
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const [persoonData] = useIngeschrevenpersoonGetByBsn(getBsnFromJWT());

  const onDeclarationCheckboxChange = (event: any) => {
    setDeclarationCheckboxData({ ...declarationCheckboxData, [event.target.name]: event.target.checked });
  };

  const onContactDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO
  };

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("common:step-n", { n: 3 })}: ${t("huwelijksplanner-step-4:title")} - ${t(
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
              <form onSubmit={onContactDetailsSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-4:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                {marriageOptions.reservation && (
                  <ReservationCard reservation={marriageOptions.reservation} locale={locale} />
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
                  {persoonData && <PersonalDataList partner={persoonData} />}
                  <Heading2 id="address">Adresgegevens</Heading2>
                  {persoonData && <AddressDataList partner={persoonData} />}
                  <Heading2 id="contact">Contactgegevens</Heading2>
                  <dl>
                    <p>Deze gegevens kun je zelf invullen of wijzigen.</p>
                    <FormField>
                      <p className="utrecht-form-field__label">
                        <FormLabel htmlFor="tel">
                          {t("form:tel")} <OptionalIndicator title={t("form:optional")} />
                        </FormLabel>
                      </p>
                      <Textbox className="utrecht-form-field__input" id="tel" type="tel" autoComplete="tel" />
                    </FormField>
                    <FormField>
                      <p className="utrecht-form-field__label">
                        <FormLabel htmlFor="email">
                          {t("form:email")} <OptionalIndicator title={t("form:optional")} />
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
                      />
                    </FormField>
                  </dl>
                  <DeclarationCheckboxGroup
                    name="checks"
                    onChange={onDeclarationCheckboxChange}
                    checkboxData={[
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
                    ]}
                  />
                  {/*<Button type="submit" name="type" appearance="primary-action-button">
                    Deze gegevens kloppen
                  </Button>*/}
                  <Button type="submit" name="type" appearance="primary-action-button">
                    Contactgegevens opslaan
                  </Button>
                </section>
                <Aside>
                  <Heading2>Meer informatie</Heading2>
                  <Paragraph>
                    Je mag in Nederland trouwen met je neef, nicht, oom of tante. Je moet dan wel komen verklaren dat je
                    niet gedwongen wordt. Neem contact op met de gemeente: <Link href="tel:14030">bel 14 030</Link> of{" "}
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

interface DeclarationCheckboxGroupProps {
  name?: string;
  checkboxData: {
    id: string;
    label: string;
    name?: string;
    value?: string;
  }[];
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export const DeclarationCheckboxGroup = ({ name, checkboxData, onChange }: DeclarationCheckboxGroupProps) => {
  const groupName = name;
  return (
    <Fieldset>
      {checkboxData &&
        checkboxData.length > 0 &&
        checkboxData.map(({ id, label, value }, index) => (
          <FormField key={index} type="checkbox">
            <Checkbox2 novalidate id={id} name={name || groupName} defaultValue={value} onChange={onChange} required />
            <FormLabel htmlFor={id} type="checkbox">
              {label}
            </FormLabel>
          </FormField>
        ))}
    </Fieldset>
  );
};
