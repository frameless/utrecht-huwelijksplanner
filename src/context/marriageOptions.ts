import { createContext } from 'react';
import { CeremonyType, RegistrationType } from '../data/huwelijksplanner-state';

export interface MarriageOptionsProps {
  type?: RegistrationType;
  ceremony?: CeremonyType;
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
