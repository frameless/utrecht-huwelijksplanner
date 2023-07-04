"use client";

import { useContext } from "react";
import { ReservationCard } from "../../../../components";
import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";
export const ReservationCardContext = ({ locale }: { locale: string }) => {
  const [marriageOptions] = useContext(MarriageOptionsContext);

  return marriageOptions?.reservation && <ReservationCard reservation={marriageOptions.reservation} locale={locale} />;
};
