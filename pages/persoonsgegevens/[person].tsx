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
import React, { useContext, useState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { Aside, Checkbox2, OptionalIndicator, PageContentMain, ReservationCard } from "../../src/components";
import { AddressDataList } from "../../src/components/huwelijksplanner/AddressDataList";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { PersonalDataList } from "../../src/components/huwelijksplanner/PersonalDataList";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { AssentService, Huwelijk, HuwelijkService } from "../../src/generated";
import { useIngeschrevenpersoonGetByBsn } from "../../src/hooks/useIngeschrevenpersoonGetByBsn";
import { getBsnFromJWT } from "../../src/openapi/authentication";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-4", "form"])),
  },
});

type FormData = {
  "correct-information-and-complete": boolean;
  "not-marrying-relative": boolean;
  unmarried: boolean;
  email?: string;
  phoneNumber?: string;
};

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-4", "form"]);
  const {
    query: { huwelijkId },
    locale = "nl",
    push,
  } = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>();
  const [marriageOptions] = useContext(MarriageOptionsContext);
  const [persoonData = null] = useIngeschrevenpersoonGetByBsn(getBsnFromJWT());
  const [huwelijk, setHuwelijk] = useState<Huwelijk>();

  const onContactDetailsSubmit = (data: FormData) => {
    if (huwelijkId) {
      HuwelijkService.huwelijkPatchItem({
        id: huwelijkId as string,
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
        push(`/persoonsgegevens/succes?huwelijkId=${huwelijkId}`);
      });
    } else {
      AssentService.assentPatchItem({
        id: huwelijk?.partners[0]._self.id,
        requestBody: {
          requester: getBsnFromJWT(),
          contact: {
            subjectIdentificatie: {
              inpBsn: getBsnFromJWT(),
            },
            ...mapToContactObject(data.email, data.phoneNumber),
          },
          results: getResultsChecklist(),
          name: null,
        },
      }).then(() => {
        push("/voorgenomen-huwelijk/partner");
      });
    }
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
              <form onSubmit={handleSubmit(onContactDetailsSubmit)}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-4:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {marriageOptions?.reservation && (
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
                  {persoonData ? <PersonalDataList partner={persoonData} /> : <Skeleton height="100px" />}
                  <Heading2 id="address">Adresgegevens</Heading2>
                  {persoonData ? <AddressDataList partner={persoonData} /> : <Skeleton height="100px" />}
                  <Heading2 id="contact">Contactgegevens</Heading2>
                  <p>Deze gegevens kun je zelf invullen of wijzigen.</p>
                  <FormField>
                    <p className="utrecht-form-field__label">
                      <FormLabel htmlFor="tel">
                        {t("form:tel")} <OptionalIndicator title={t("form:optional")} />
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
                      {...register("email")}
                    />
                  </FormField>
                  <DeclarationCheckboxGroup register={register} checkboxData={checkboxData} />
                  <Button disabled={!formState.isValid} type="submit" name="type" appearance="primary-action-button">
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

type CheckboxData = {
  id: string;
  label: string;
  value: CheckType;
};

type CheckType = "correct-information-and-complete" | "not-marrying-relative" | "unmarried";

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
