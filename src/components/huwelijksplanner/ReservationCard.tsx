/**
 * @license EUPL-1.2
 * Copyright (c) 2021 Robbert Broersma
 */

import { HTMLAttributes, useContext } from "react";
import { MarriageOptionsContext } from "../../context/MarriageOptionsContext";
import { ValueCurrency } from "../ValueCurrency";
import { SpotlightSection } from "../index";

interface ReservationCardProps extends HTMLAttributes<HTMLElement> {
  locale: string;
}

export const ReservationCard = ({ locale }: ReservationCardProps) => {
  const [marriageOptions] = useContext(MarriageOptionsContext);

  const { huwelijk: reservation } = marriageOptions;

  if (!reservation) {
    return <>No reservation found.</>;
  }

  return (
    <SpotlightSection type="info">
      <div>
        {reservation["ceremony-location"]} - {reservation["ceremony-type"]}
      </div>
      <div>
        <time dateTime={reservation["ceremony-start"]}>
          {new Intl.DateTimeFormat(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(reservation["ceremony-start"]))}
          {", "}
          {new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(reservation["ceremony-start"]))}
        </time>
        {" - "}
        <time dateTime={reservation["ceremony-end"]}>
          {/*TODO: This short notation assumes the start and end are on the same day and is not worth mentioning for end date */}{" "}
          {new Intl.DateTimeFormat(locale, {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(reservation["ceremony-end"]))}
        </time>
      </div>
      {/*TODO:Intl currency format */}
      <div>
        Kosten:{" "}
        <ValueCurrency
          currency={reservation["ceremony-price-currency"]}
          amount={reservation["ceremony-price-amount"]}
          locale={locale}
        />
      </div>
    </SpotlightSection>
  );
};
