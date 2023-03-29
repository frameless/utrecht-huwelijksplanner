import { createContext } from 'react';

export interface MarriageOptionsProps {
  type?: string;
  ceremony?: string;
  official?: string;
  location?: string;
  date?: string;
  time?: string;
}

export const marriageOptions = {} as MarriageOptionsProps;

export const MarriageOptionsContext = createContext<[MarriageOptionsProps, (data: MarriageOptionsProps) => void]>([
  marriageOptions,
  () => null,
]);

export const MarriageOptionsProvider = MarriageOptionsContext.Provider;