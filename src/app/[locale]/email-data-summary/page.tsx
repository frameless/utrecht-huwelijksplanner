import type { Metadata } from "next";
import {
  DataList,
  DataListItem,
  DataListKey,
  DataListValue,
  DateValue,
  Email,
  EmptyIndicator,
  Heading1,
  Heading2,
  Heading3,
  NumberValue,
  Paragraph,
  ReservationCard,
  UnorderedList,
  UnorderedListItem,
  URLValue,
} from "../../../components";
import { exampleState, HuwelijksplannerPartner, Invitee } from "../../../data/huwelijksplanner-state";
import { useTranslation } from "../../i18n";

const formatAddress = (partner: HuwelijksplannerPartner) =>
  [
    `${partner.street || ""} ${partner["house-number"] || ""}${partner["house-number-letter"] || ""}${
      partner["house-number-suffix"] || ""
    }`,
    `${partner["postal-code"] || ""} ${partner["place-of-residence"] || ""}`,
    partner["country-of-residence"] || "",
  ].join("\n");

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "email-data-summary");
  return {
    title: `${t("title")}`,
  };
}

export default async function HuwelijksplannerStep0({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["form", "email-data-summary", "huwelijksplanner"]);
  const data = { ...exampleState };

  const PartnerDataList = ({ partner }: { partner: HuwelijksplannerPartner }) => (
    <DataList className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("bsn")}</DataListKey>
        <DataListValue>
          <NumberValue>{partner.bsn}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("salutation")}</DataListKey>
        <DataListValue>{partner.salutation}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("family-name")}</DataListKey>
        <DataListValue notranslate={true}>
          {partner["family-name-prefix"]} {partner["family-name"]}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("given-name")}</DataListKey>
        <DataListValue notranslate={true}>{partner["given-name"]}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("bday")}</DataListKey>
        <DataListValue>
          {partner["bday"] ? (
            <DateValue dateTime={partner["bday"]} locale={locale} />
          ) : (
            <EmptyIndicator title={t("value-unknown.bday")} />
          )}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>Geboorteplaats, - land</DataListKey>
        <DataListValue>
          {partner["place-of-birth"]}, {partner["country-of-birth"]}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("address")}</DataListKey>
        <DataListValue multiline notranslate={true}>
          {formatAddress(partner)}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("nationality")}</DataListKey>
        <DataListValue>{partner.nationality}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>Burgerlijke staat</DataListKey>
        <DataListValue>Ongehuwd en nooit gehuwd geweest</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>Indicatie curateleregister</DataListKey>
        <DataListValue>{partner["indicatie-curateleregister"] === 1 ? "Ja" : "Nee"}</DataListValue>
      </DataListItem>
    </DataList>
  );

  const WitnessDataList = ({ witness, locale }: { witness: Invitee; locale: string }) => (
    <DataList className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("bsn")}</DataListKey>
        <DataListValue>
          <NumberValue>{witness.bsn}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>Geslachtsnaam en voorna(a)m(en)</DataListKey>
        <DataListValue notranslate={true}>Deursen, Adriaan</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("email")}</DataListKey>
        <DataListValue>
          <URLValue>{witness.email}</URLValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("bday")}</DataListKey>
        <DataListValue>
          {witness["bday"] ? (
            <DateValue dateTime={witness["bday"]} locale={locale} />
          ) : (
            <EmptyIndicator title={t("value-unknown.bday")} />
          )}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>Adres, postcode, woonplaats en land</DataListKey>
        <DataListValue multiline notranslate={true}>{`Nieuwegracht 17\n3512 LC Utrecht\nNederland`}</DataListValue>
      </DataListItem>
    </DataList>
  );

  const ContactInfoDataList = ({ partner }: { partner: HuwelijksplannerPartner; locale: string }) => (
    <DataList className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("tel")}</DataListKey>
        <DataListValue>
          <NumberValue>{partner.tel}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("email")}</DataListKey>
        <DataListValue>
          <URLValue>{partner.email}</URLValue>
        </DataListValue>
      </DataListItem>
    </DataList>
  );

  return (
    <Email>
      <Heading1>{t("title")}</Heading1>
      {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale} /> : ""}
      <section>
        <Heading2>{t("aanstaande")} 1</Heading2>
        {data.partners[0] ? (
          <>
            <PartnerDataList partner={data.partners[0]} />
            <Heading3>Gegevens ouders echtgeno(o)t(e) 1</Heading3>
            <DataList className="utrecht-data-list--rows">
              <DataListItem>
                <DataListKey>Geslachtsnaam en voorna(a)m(en) ouder 1</DataListKey>
                <DataListValue>Deursen, Adriaan</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Geslachtsnaam en voorna(a)m(en) ouder 2</DataListKey>
                <DataListValue>Deursen - Verhagen, Anna Maria Johanna</DataListValue>
              </DataListItem>
              <DataListItem>
                <DataListKey>Aanstaande echtgeno(o)t(e) 1 heeft verklaard dat:</DataListKey>
                <DataListValue>
                  <UnorderedList>
                    <UnorderedListItem>
                      Niet met iemand anders getrouwd is (in Nederland of in een ander land). Heeft nu ook geen
                      geregistreerd partnerschap.
                    </UnorderedListItem>
                    <UnorderedListItem>Niet trouwt met neef, nicht, oom of tante.</UnorderedListItem>
                    <UnorderedListItem>De gegevens die hierboven staan kloppen en compleet zijn.</UnorderedListItem>
                  </UnorderedList>
                </DataListValue>
              </DataListItem>
            </DataList>
            <section>
              <Heading3>Contactgevens</Heading3>
              <ContactInfoDataList partner={data.partners[0]} locale={locale} />
            </section>
          </>
        ) : (
          ""
        )}
        <section>
          <Heading2>Aanstaande echtgeno(o)t(e) 2</Heading2>
          {data.partners[1] ? (
            <>
              <PartnerDataList partner={data.partners[1]} />
              <Heading3>Gegevens ouders echtgeno(o)t(e) 2</Heading3>
              <DataList className="utrecht-data-list--rows">
                <DataListItem>
                  <DataListKey>Geslachtsnaam en voorna(a)m(en) ouder 1</DataListKey>
                  <DataListValue>Broecke, van den, Hans Eric</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>Geslachtsnaam en voorna(a)m(en) ouder 2</DataListKey>
                  <DataListValue>Broecke, van den, Elisabeth Cornelia</DataListValue>
                </DataListItem>
                <DataListItem>
                  <DataListKey>Aanstaande echtgeno(o)t(e) 2 heeft verklaard dat:</DataListKey>
                  <DataListValue>
                    <UnorderedList>
                      <UnorderedListItem>
                        Niet met iemand anders getrouwd is (in Nederland of in een ander land). Heeft nu ook geen
                        geregistreerd partnerschap.
                      </UnorderedListItem>
                      <UnorderedListItem>Niet trouwt met neef, nicht, oom of tante.</UnorderedListItem>
                      <UnorderedListItem>De gegevens die hierboven staan kloppen en compleet zijn.</UnorderedListItem>
                    </UnorderedList>
                  </DataListValue>
                </DataListItem>
              </DataList>
              <section>
                <Heading3>Contactgevens</Heading3>
                <ContactInfoDataList partner={data.partners[1]} locale={locale} />
              </section>
            </>
          ) : (
            ""
          )}
          {data.witnesses.length > 0 ? (
            data.witnesses.map((witness, index) => (
              <section key={index}>
                <Heading3>
                  {t("legal-witness")} {index + 1}
                </Heading3>
                <WitnessDataList witness={witness} locale={locale} />
              </section>
            ))
          ) : (
            <Paragraph>{t("no-required-witness")}</Paragraph>
          )}
        </section>
      </section>
    </Email>
  );
}
