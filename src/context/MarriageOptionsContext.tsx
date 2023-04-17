import { createContext, ReactNode, useEffect, useState } from "react";
import { CeremonyType, RegistrationType } from "../data/huwelijksplanner-state";
import { Reservation } from "../data/huwelijksplanner-state";

interface Huwelijk extends Reservation {
  id: string;
  firstPartnerName: string;
}

export interface MarriageOptionsProps {
  type?: RegistrationType;
  ceremony?: CeremonyType;
  official?: string;
  location?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  huwelijk: Huwelijk;
  ambtenaar?: string;
  ceremonyId?: string;
}

const myWindow = typeof window !== "undefined" ? window : undefined;

const getSavedMarriageOptions = () => {
  const savedOptions = myWindow?.sessionStorage.getItem("marriageOptions");
  return savedOptions ? JSON.parse(savedOptions) : {};
};

export const MarriageOptionsContext = createContext<[MarriageOptionsProps, (_: MarriageOptionsProps) => void]>([
  getSavedMarriageOptions(),
  () => null,
]);

export const MarriageOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [marriageOptions, setMarriageOptions] = useState(getSavedMarriageOptions());

  useEffect(() => {
    myWindow?.sessionStorage.setItem("marriageOptions", JSON.stringify(marriageOptions));
  }, [marriageOptions]);

  return (
    <MarriageOptionsContext.Provider value={[marriageOptions, setMarriageOptions]}>
      {children}
    </MarriageOptionsContext.Provider>
  );
};
