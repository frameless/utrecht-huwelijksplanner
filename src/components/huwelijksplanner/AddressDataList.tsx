"use client";
import { useTranslation } from "../../app/i18n/client";
import { IngeschrevenPersoon } from "../../generated";
import { DataList, DataListItem, DataListKey, DataListValue, NumberValue } from "../index";

export const AddressDataList = ({ partner, locale }: { partner: IngeschrevenPersoon; locale: string }) => {
  const { t } = useTranslation(locale, ["form"]);
  return (
    <DataList aria-describedby="address" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("street")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.straat} emptyDescription={t("data-item-unknown")}>
          {partner.verblijfplaats.straat ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("house-number")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.huisnummer} emptyDescription={t("data-item-unknown")}>
          <NumberValue>{partner.verblijfplaats.huisnummer ?? "-"}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("house-number-suffix")}</DataListKey>
        <DataListValue
          value={partner.verblijfplaats.huisnummerToevoeging}
          emptyDescription={t("data-item-empty")}
          notranslate={true}
        >
          {partner.verblijfplaats.huisnummerToevoeging ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("postal-code")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.postcode} emptyDescription={t("data-item-unknown")}>
          {partner.verblijfplaats.postcode ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("place-of-residence")}</DataListKey>
        <DataListValue
          value={partner.verblijfplaats.woonplaats}
          emptyDescription={t("data-item-unknown")}
          notranslate={true}
        >
          {partner.verblijfplaats.woonplaats ?? "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );
};
