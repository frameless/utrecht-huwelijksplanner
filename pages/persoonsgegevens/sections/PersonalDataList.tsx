import { DataList, DataListItem, DataListKey, DataListValue, NumberValue } from "@utrecht/component-library-react";
import { useTranslation } from "next-i18next";
import { IngeschrevenPersoon } from "../../../src/generated";

export const PersonalDataList = ({ partner }: { partner: IngeschrevenPersoon }) => {
  const { t } = useTranslation(["common", "huwelijksplanner-step-4", "form"]);

  return (
    <DataList aria-describedby="personal-details" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("form:bsn")}</DataListKey>
        <DataListValue value={partner.burgerservicenummer ?? ""} emptyDescription={t("form:data-item-unknown")}>
          <NumberValue>{partner.burgerservicenummer}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:sex")}</DataListKey>
        <DataListValue value={partner.geslachtsaanduiding ?? ""} emptyDescription={t("form:data-item-unknown")}>
          {partner.geslachtsaanduiding ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:given-name")}</DataListKey>
        <DataListValue value={partner.naam.voornamen} emptyDescription={t("form:data-item-unknown")} notranslate={true}>
          {partner.naam.voornamen ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:family-name-prefix")}</DataListKey>
        <DataListValue
          value={partner.naam.voorvoegsel}
          emptyDescription={t("form:data-item-empty")}
          notranslate={true}
        >
          {partner.naam.voorvoegsel ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:family-name")}</DataListKey>
        <DataListValue value={partner.naam.geslachtsnaam} emptyDescription={t("form:data-item-unknown")} notranslate={true}>
          {partner.naam.geslachtsnaam  ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:bday")}</DataListKey>
        <DataListValue value={partner.geboorte.datumOnvolledig.datum} emptyDescription={t("form:data-item-unknown")}>
          {partner.geboorte.datumOnvolledig.datum ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:place-of-birth")}</DataListKey>
        <DataListValue
          value={partner.geboorte.datumOnvolledig.plaats}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {partner.geboorte.datumOnvolledig.plaats ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:nationality")}</DataListKey>
        <DataListValue value={partner.nationaliteiten[0].nationaliteit.code} emptyDescription={t("form:data-item-unknown")} notranslate={true}>
          {partner.nationaliteiten[0].nationaliteit.omschrijving || partner.nationaliteiten[0].nationaliteit.code}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:registered-guardianship")}</DataListKey>
        <DataListValue
          value={partner.gezagsverhouding === 1 ? "Ja" : undefined}
          emptyDescription={t("form:data-item-unknown")}
        >
          {/*TODO:What are the values and labels here?*/}
          {partner.gezagsverhouding ? "Ja" : "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );
};
