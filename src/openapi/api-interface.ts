import type { Assent } from '../../src/generated/openapi/Overige-Objecten';
import type { Accomodation } from '../../src/generated/openapi/Overige-Objecten';
import type { SDG as Product } from '../../src/generated/openapi/Overige-Objecten';
import type { huwelijk as Huwelijk } from '../../src/generated/openapi/trouwservice';
import type { Availability } from '../generated/openapi/Agenda-Service';
import type { Klant } from '../generated/openapi/klanten';

export interface HuwelijksplannerInterface {
  getProducten(): Promise<Product[]>;
  getAccommodations(): Promise<Accomodation[]>;
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
