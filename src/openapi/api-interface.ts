import { Accommodation, Assent, Availability, Huwelijk, Klant, SDGProduct } from "../generated";

export interface HuwelijksplannerInterface {
  getProducten(): Promise<SDGProduct[]>;
  getAccommodations(): Promise<Accommodation[]>;
  getAssents(): Promise<Assent[]>;
  deleteAssent(_data: Assent): any;
  putAssent(_data: Assent): any;
  declineAssent(_assent: Assent): any;
  grantAssent(_assent: Assent): any;
  getHuwelijk(_id: string): Promise<Huwelijk>;
  getHuwelijken(): Promise<Huwelijk[]>;
  deleteHuwelijk(_huwelijk: Huwelijk): any;
  getKlanten(): Promise<Klant[]>;
  getKlant(_uuid: string): Promise<Klant>;
  getAvailability(_arg: { interval?: string; start?: string; stop?: string }): Promise<Availability[]>;
}

export interface ResultsWrapper<T> {
  results: T;
  count: number;
  limit: number;
  total: number;
  start: number;
  page: number;
  pages: number;
}
