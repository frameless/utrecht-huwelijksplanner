"use client";
import { useTranslation } from "../../app/i18n/client";
import { IngeschrevenPersoon } from "../../generated";
import { DataList, DataListItem, DataListKey, DataListValue, NumberValue } from "../index";

export const PersonalDataList = ({ partner, locale }: { partner: IngeschrevenPersoon; locale: string }) => {
  const { t } = useTranslation(locale, ["form"]);

  return (
    <DataList aria-describedby="personal-details" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("bsn")}</DataListKey>
        <DataListValue value={partner.burgerservicenummer ?? ""} emptyDescription={t("data-item-unknown")}>
          <NumberValue>{partner.burgerservicenummer}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("sex")}</DataListKey>
        <DataListValue value={partner.geslachtsaanduiding ?? ""} emptyDescription={t("data-item-unknown")}>
          {partner.geslachtsaanduiding ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("given-name")}</DataListKey>
        <DataListValue value={partner.naam.voornamen} emptyDescription={t("data-item-unknown")} notranslate={true}>
          {partner.naam.voornamen ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("family-name-prefix")}</DataListKey>
        <DataListValue value={partner.naam.voorvoegsel} emptyDescription={t("data-item-empty")} notranslate={true}>
          {partner.naam.voorvoegsel ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("family-name")}</DataListKey>
        <DataListValue value={partner.naam.geslachtsnaam} emptyDescription={t("data-item-unknown")} notranslate={true}>
          {partner.naam.geslachtsnaam ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("bday")}</DataListKey>
        <DataListValue value={partner.geboorte.datumOnvolledig.datum} emptyDescription={t("data-item-unknown")}>
          {partner.geboorte.datumOnvolledig.datum ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("place-of-birth")}</DataListKey>
        <DataListValue
          value={partner.geboorte.datumOnvolledig.plaats}
          emptyDescription={t("data-item-unknown")}
          notranslate={true}
        >
          {partner.geboorte.datumOnvolledig.plaats ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("nationality")}</DataListKey>
        <DataListValue
          value={partner.nationaliteiten[0].nationaliteit.code}
          emptyDescription={t("data-item-unknown")}
          notranslate={true}
        >
          {partner.nationaliteiten[0].nationaliteit.omschrijving || partner.nationaliteiten[0].nationaliteit.code}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("registered-guardianship")}</DataListKey>
        <DataListValue
          value={partner.gezagsverhouding === 1 ? "Ja" : undefined}
          emptyDescription={t("data-item-unknown")}
        >
          {/*TODO:What are the values and labels here?*/}
          {partner.gezagsverhouding ? "Ja" : "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );
};
