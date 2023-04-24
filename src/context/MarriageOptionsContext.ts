import { createContext, SetStateAction } from 'react';
import { HuwelijksplannerInput, HuwelijksplannerState, initialState } from '../data/huwelijksplanner-state';

export const MarriageOptionsContext = createContext<[HuwelijksplannerState, (_: HuwelijksplannerState) => void]>([
  initialState,
  () => null,
]);
