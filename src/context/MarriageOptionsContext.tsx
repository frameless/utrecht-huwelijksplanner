"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { HuwelijksplannerState, initialState } from "../data/huwelijksplanner-state";

const myWindow = typeof window !== "undefined" ? window : undefined;

const getSavedMarriageOptions = () => {
  const savedOptions = myWindow?.sessionStorage.getItem("marriageOptions");
  return savedOptions ? JSON.parse(savedOptions) : {};
};

export const MarriageOptionsContext = createContext<[HuwelijksplannerState, (_: HuwelijksplannerState) => void]>([
  initialState,
  () => null,
]);

export const MarriageOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [marriageOptions, setMarriageOptions] = useState<HuwelijksplannerState>(initialState);

  useEffect(() => {
    setMarriageOptions(getSavedMarriageOptions);
  }, []);

  useEffect(() => {
    if (!marriageOptions?.productId) return;

    myWindow?.sessionStorage.setItem("marriageOptions", JSON.stringify(marriageOptions));
  }, [marriageOptions]);

  return (
    <MarriageOptionsContext.Provider value={[marriageOptions, setMarriageOptions]}>
      {children}
    </MarriageOptionsContext.Provider>
  );
};
