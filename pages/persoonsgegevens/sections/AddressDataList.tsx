import { DataList, DataListItem, DataListKey, DataListValue, NumberValue } from "@utrecht/component-library-react";
import { useTranslation } from "next-i18next";
import { IngeschrevenPersoon } from "../../../src/generated";

export const AddressDataList = ({ partner }: { partner: IngeschrevenPersoon }) => {
  const { t } = useTranslation(["common", "huwelijksplanner-step-4", "form"]);
  return (
    <DataList aria-describedby="address" className="utrecht-data-list--rows">
      <DataListItem>
        <DataListKey>{t("form:street")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.straat} emptyDescription={t("form:data-item-unknown")}>
          {partner.verblijfplaats.straat ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:house-number")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.huisnummer} emptyDescription={t("form:data-item-unknown")}>
          <NumberValue>{partner.verblijfplaats.huisnummer ?? "-"}</NumberValue>
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:house-number-suffix")}</DataListKey>
        <DataListValue
          value={partner.verblijfplaats.huisnummerToevoeging}
          emptyDescription={t("form:data-item-empty")}
          notranslate={true}
        >
          {partner.verblijfplaats.huisnummerToevoeging ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:postal-code")}</DataListKey>
        <DataListValue value={partner.verblijfplaats.postcode} emptyDescription={t("form:data-item-unknown")}>
          {partner.verblijfplaats.postcode ?? "-"}
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:place-of-residence")}</DataListKey>
        <DataListValue
          value={partner.verblijfplaats.woonplaats}
          emptyDescription={t("form:data-item-unknown")}
          notranslate={true}
        >
          {partner.verblijfplaats.woonplaats ?? "-"}
        </DataListValue>
      </DataListItem>
    </DataList>
  );
};
