import {
  Button,
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  Document,
  Fieldset,
  FormField,
  FormFieldDescription,
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
  Textbox,
} from "@utrecht/component-library-react";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ChangeEventHandler, FormEvent, useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Aside, OptionalIndicator, PageContentMain } from "../../src/components";
import { Checkbox2 } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../src/components/huwelijksplanner/ReservationCard";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { Huwelijk, HuwelijkService, IngeschrevenPersoon, IngeschrevenpersoonService } from "../../src/generated";
import { getBsnFromJWT } from "../../src/services/getBsnFromJWT";

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

  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [huwelijk, setHuwelijk] = useState<Huwelijk | null>(null);
  const [ingeschrevenPersoon, setIngeschrevenPersoon] = useState<IngeschrevenPersoon | null>(null);

  const { huwelijkId } = query;

  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);

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
    ).then((res: any) => {
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
    if (!huwelijk) return;

    const { partners } = huwelijk;

    const currentPartner = partners.find((p: any) => p.contact?.subjectIdentificatie?.inpBsn === getBsnFromJWT());

    if (!currentPartner) return;

    setEmail(currentPartner.contact.emails[0].email);
    setPhoneNumber(currentPartner.contact.telefoonnummers[0].telefoonnummer);
  }, [huwelijk]);

  useEffect(() => {
    if (huwelijk) return;

    const handleNewPersonLogin = () => {
      setIsLoading(true);

      HuwelijkService.huwelijkPostItem({
        type: marriageOptions.type,
        ceremonie: "868da2b9-242d-4053-8e21-8a9ef66bd15c", // Ceremonie is "flits-balie" of "uitgebreid-trouwen"; uuid
        moment: marriageOptions?.startTime ?? "2019-08-24T14:15:22",
        ambtenaar: "4a96dcc4-66e4-46b9-b785-3cc89931a3e2", // TODO: Sarai stuurt id door
        locatie: "e1b2aa89-dcd8-4b77-96fc-d41501cbc57f", //marriageOptions?.location ?? "",
      })
        .then((res) => {
          const _res = JSON.parse(res as string);

          setMarriageOptions({
            ...marriageOptions,
            huwelijk: {
              id: _res._self.id,
              firstPartnerName: `${_res?.partners[0]?.contact?.voornaam} ${_res?.partners[0]?.contact?.achternaam}`,
              expiry: "FIXME: over 2 uur",
              "ceremony-type": _res.ceremonie.upnLabel,
              "ceremony-start": _res.moment ?? "",
              "ceremony-end": _res.moment ? moment(_res.moment).add(15, "m").toDate().toString() : "",
              "ceremony-location": "Locatie Stadskantoor",
              "ceremony-price-currency": "EUR",
              "ceremony-price-amount": _res.kosten ? _res.kosten.replace("EUR ", "") : "-",
            },
          });

          if (!huwelijk) setHuwelijk(_res); // TODO: two are being created, this ensures its not overwritten
        })
        .finally(() => setIsLoading(false));
    };

    const handleSecondPersonLogin = () => {
      setIsLoading(true);
      HuwelijkService.huwelijkGetItem(huwelijkId as string)
        .then((res) => {
          setHuwelijk(res);
        })
        .finally(() => setIsLoading(false));
    };

    if (!huwelijkId) handleNewPersonLogin();
    if (huwelijkId) handleSecondPersonLogin();
  }, [huwelijk, huwelijkId, marriageOptions, setMarriageOptions]);

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

  const onContactDetailsSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // TODO: dit had een PATCH naar Assent moeten zijn denk ik

    const payload: any = {
      contact: {
        emails: [{ email: email, naam: email }],
        telefoonnummers: [{ telefoonnummer: phoneNumber, naam: phoneNumber }],
      },
    };

    if (huwelijkId) {
      payload.requester = getBsnFromJWT();
      payload.contact.subjectIdentificatie = { inpBsn: getBsnFromJWT() };
    }

    console.log({huwelijk})

    // @ts-ignore
    HuwelijkService.huwelijkPatchItem(huwelijk?._self.id as string, {
      partners: [payload],
    }).then(() => {
      if (!huwelijkId) {
        push("/voorgenomen-huwelijk/partner");
      } else {
        push(`/persoonsgegevens/succes?huwelijkId=${huwelijkId}`);
      }
    });
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

                  <Heading2 id="contact">Contactgegevens</Heading2>
                  <dl>
                    <p>Deze gegevens kun je zelf invullen of wijzigen.</p>
                    <FormField>
                      <p className="utrecht-form-field__label">
                        <FormLabel htmlFor="tel">
                          {t("form:tel")} <OptionalIndicator title={t("form:optional")} />
                        </FormLabel>
                      </p>
                      <Textbox
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="utrecht-form-field__input"
                        id="tel"
                        type="tel"
                        autoComplete="tel"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="utrecht-form-field__input"
                        id="email"
                        type="email"
                        autoComplete="email"
                        aria-describedby="email-description"
                      />
                    </FormField>
                  </dl>
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
                  {/*<Button type="submit" name="type" appearance="primary-action-button">
                    Deze gegevens kloppen
                  </Button>*/}
                  <Button
                    disabled={isLoading || !declarationCheckboxChecked}
                    type="submit"
                    name="type"
                    appearance="primary-action-button"
                  >
                    {isLoading ? "Loading..." : "Contactgegevens opslaan"}
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
            <Checkbox2 novalidate id={id} name={value || groupName} defaultValue={value} onChange={onChange} required />
            <FormLabel htmlFor={id} type="checkbox">
              {label}
            </FormLabel>
          </FormField>
        ))}
    </Fieldset>
  );
};
