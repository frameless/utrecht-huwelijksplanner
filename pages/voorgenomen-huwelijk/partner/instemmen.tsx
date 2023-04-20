import {
  Button,
  ButtonGroup,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  Document,
  Fieldset,
  FormField,
  FormLabel,
  Heading1,
  Heading2,
  HeadingGroup,
  Link,
  NumberValue,
  Page,
  PageContent,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  SpotlightSection,
  Surface,
} from "@utrecht/component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEventHandler, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Aside, PageContentMain } from "../../../src/components";
import { Checkbox2 } from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import {
  Assent,
  Assent as AssentNamespace,
  AssentService,
  Huwelijk,
  HuwelijkService,
  IngeschrevenPersoon,
  IngeschrevenpersoonService,
} from "../../../src/generated";
import { isAuthenticated, unauthenticate } from "../../../src/services/authentication";
import { getBsnFromJWT } from "../../../src/services/getBsnFromJWT";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-4", "form"])),
  },
});

export default function MultistepForm1() {
  const [declarationCheckboxData, setDeclarationCheckboxData] = useState<any>({
    "correct-information-and-complete": false,
    "not-marrying-relative": false,
    unmarried: false,
  });
  const [declarationCheckboxChecked, setDeclarationCheckboxChecked] = useState<boolean>(false);
  const { t } = useTranslation(["common", "huwelijksplanner-step-4", "form"]);
  const { query, locale = "nl", push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [huwelijk, setHuwelijk] = useState<Huwelijk | null>(null);
  const [ingeschrevenPersoon, setIngeschrevenPersoon] = useState<IngeschrevenPersoon | null>(null);
  const [assent, setAssent] = useState<Assent | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);
  const { huwelijkId, assentId } = query;

  const handleResponseSubmit = (response: AssentNamespace.status) => {
    setIsLoading(true);

    AssentService.assentPatchItem(
      assentId as string,
      {
        status: response,
      } as Assent
    )
      .then(() => {
        unauthenticate();
        setIsCompleted(true);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const handleGetAssent = () => {
      setIsLoading(true);

      AssentService.assentGetItem(assentId as string)
        .then((res) => setAssent(res))
        .finally(() => setIsLoading(false));
    };

    if (!assentId) return; // all logic requires the assentId.

    if (!isAuthenticated()) {
      push(`/gateway-login?redirectUrl=/voorgenomen-huwelijk/partner/instemmen?assentId=${assentId}`);
    }

    if (isAuthenticated()) {
      handleGetAssent();
    }
  }, [assentId, push]);

  if (!assentId) {
    return <>Did not receive a "assentId" param.</>;
  }

  useEffect(() => {
    if (!getBsnFromJWT() || ingeschrevenPersoon) return;

    IngeschrevenpersoonService.ingeschrevenpersoonGetCollection(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      getBsnFromJWT() // passing { burgerservicenummer: "bsn" } breaks the call
    ).then((res) => {
      setIngeschrevenPersoon(res.results[0]);
    });
  }, [huwelijk, ingeschrevenPersoon]);

  useEffect(() => {
    if (
      declarationCheckboxData["correct-information-and-complete"] === true &&
      declarationCheckboxData["not-marrying-relative"] === true &&
      declarationCheckboxData["unmarried"] === true
    ) {
      setDeclarationCheckboxChecked(true);
    } else {
      setDeclarationCheckboxChecked(false);
    }
  }, [declarationCheckboxData]);

  useEffect(() => {
    if (!assent) return;
    if (huwelijk) return;

    const handleSecondPersonLogin = () => {
      setIsLoading(true);
      HuwelijkService.huwelijkGetItem(assent.property as string)
        .then((res) => {
          setHuwelijk(res);
        })
        .finally(() => setIsLoading(false));
    };

    if (huwelijkId) handleSecondPersonLogin();
  }, [huwelijk, huwelijkId, assent, marriageOptions, setMarriageOptions]);

  const onDeclarationCheckboxChange = (event: any) => {
    setDeclarationCheckboxData({ ...declarationCheckboxData, [event.target.name]: event.target.checked });
  };

  const PersonalDataList = ({ ingeschrevenPersoon }: { ingeschrevenPersoon: any }) => (
    <DataList aria-describedby="personal-details" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("form:bsn")}</DataListKey>
        <DataListValue
          value={ingeschrevenPersoon.burgerservicenummer ?? ""}
          emptyDescription={t("form:data-item-unknown")}
        >
          <NumberValue>{ingeschrevenPersoon.burgerservicenummer}</NumberValue>
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>Geslacht</DataListKey>
        <DataListValue value={"partner.salutation"} emptyDescription={t("form:data-item-unknown")}>
          {ingeschrevenPersoon.geslachtsaanduiding ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:given-name")}</DataListKey>
        <DataListValue
          value={'partner["given-name"]'}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {ingeschrevenPersoon.embedded.naam.voornamen ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:family-name-prefix")}</DataListKey>
        <DataListValue
          value={'partner["family-name-prefix"]'}
          emptyDescription={t("form:data-item-empty")}
          notranslate={true}
        >
          {ingeschrevenPersoon.embedded.naam.voorvoegsel ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:family-name")}</DataListKey>
        <DataListValue
          value={'partner["family-name"]'}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {ingeschrevenPersoon.embedded.naam.geslachtsnaam ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:marital-status")}</DataListKey>
        <DataListValue value={'partner["marital-status"]'} emptyDescription={t("form:data-item-unknown")}>
          -
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:bday")}</DataListKey>
        <DataListValue value={'partner["bday"]'} emptyDescription={t("form:data-item-unknown")}>
          {ingeschrevenPersoon?.embedded?.geboorte?.embedded?.datumOnvolledig?.datum ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:place-of-birth")}</DataListKey>
        <DataListValue
          value={'partner["place-of-birth"]'}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {ingeschrevenPersoon?.embedded?.geboorte?.embedded?.datumOnvolledig?.plaats ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:nationality")}</DataListKey>
        <DataListValue
          value={'partner["nationality"]'}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {ingeschrevenPersoon.nationaliteiten ?? "-"}
        </DataListValue>
      </DataListItem>

      <DataListItem>
        <DataListKey>{t("form:registered-guardianship")}</DataListKey>
        <DataListValue
          value="Ja" //{partner["indicatie-curateleregister"] === 1 ? "Ja" : undefined}
          emptyDescription={t("form:data-item-unknown")}
        >
          {ingeschrevenPersoon.gezagsverhouding ?? "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );

  const AddressDataList = ({ ingeschrevenPersoon }: { ingeschrevenPersoon: any }) => (
    <DataList aria-describedby="address" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("form:street")}</DataListKey>
        <DataListValue value={"partner.street"} emptyDescription={t("form:data-item-unknown")}>
          {ingeschrevenPersoon.embedded.verblijfplaats.straat ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:house-number")}</DataListKey>
        <DataListValue value={'partner["house-number"]'} emptyDescription={t("form:data-item-unknown")}>
          {ingeschrevenPersoon.embedded.verblijfplaats.huisnummer ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:house-number-suffix")}</DataListKey>
        <DataListValue
          value={'partner["house-number-suffix"]'}
          emptyDescription={t("form:data-item-empty")}
          notranslate={true}
        >
          {ingeschrevenPersoon.embedded.verblijfplaats.huisnummerToevoeging ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:postal-code")}</DataListKey>
        <DataListValue value={'partner["postal-code"]'} emptyDescription={t("form:data-item-unknown")}>
          {ingeschrevenPersoon.embedded.verblijfplaats.postcode ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:place-of-residence")}</DataListKey>
        <DataListValue
          value={'partner["place-of-residence"]'}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {ingeschrevenPersoon.embedded.verblijfplaats.woonplaats ?? "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );

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
              <form>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-4:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                {!isCompleted && (
                  <>
                    {marriageOptions.huwelijk ? <ReservationCard locale={locale} /> : <Skeleton height="200px" />}
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

                      {ingeschrevenPersoon ? (
                        <PersonalDataList ingeschrevenPersoon={ingeschrevenPersoon} />
                      ) : (
                        <Skeleton height="100px" />
                      )}

                      <Heading2 id="address">Adresgegevens</Heading2>

                      {ingeschrevenPersoon ? (
                        <AddressDataList ingeschrevenPersoon={ingeschrevenPersoon} />
                      ) : (
                        <Skeleton height="100px" />
                      )}

                      <DeclarationCheckboxGroup
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

                      {!isAuthenticated() && !isCompleted && (
                        <>Een ogenblik geduld, u wordt doorverwezen naar de inlogpagina...</>
                      )}
                      <ButtonGroup>
                        <Button
                          disabled={isLoading || !assent || !declarationCheckboxChecked}
                          appearance="primary-action-button"
                          onClick={() => handleResponseSubmit(AssentNamespace.status.GRANTED)}
                        >
                          Accepteren
                        </Button>

                        <Button
                          disabled={isLoading || !assent}
                          onClick={() => handleResponseSubmit(AssentNamespace.status.DECLINED)}
                        >
                          Afwijzen
                        </Button>
                      </ButtonGroup>
                    </section>
                  </>
                )}
                {isCompleted && (
                  <section>
                    <>Bedankt voor uw reactie, uw sessie is afgesloten. U kunt deze pagina verlaten.</>
                  </section>
                )}
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
            <Checkbox2 novalidate id={id} name={value || groupName} defaultValue={value} onChange={onChange} required />
            <FormLabel htmlFor={id} type="checkbox">
              {label}
            </FormLabel>
          </FormField>
        ))}
    </Fieldset>
  );
};
