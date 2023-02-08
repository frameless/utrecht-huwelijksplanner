export type { Assent } from '../../src/generated/openapi/Overige-Objecten';
export type { Accomodation } from '../../src/generated/openapi/Overige-Objecten';
export type { SDG as Product } from '../../src/generated/openapi/Overige-Objecten';
export type { huwelijk as Huwelijk } from '../../src/generated/openapi/trouwservice';
export type { Klant } from '../generated/openapi/klanten';
import { HuwelijksplannerInterface } from './api-interface';
import agendaJSON from './mock/agenda.json';
import assentsJSON from './mock/assents.json';
import huwelijkenJSON from './mock/huwelijken.json';
import klantenJSON from './mock/klanten.json';
import productenJSON from './mock/producten.json';
import type { Assent } from '../../src/generated/openapi/Overige-Objecten';
import type { huwelijk as Huwelijk } from '../../src/generated/openapi/trouwservice';
import { resolveEmbedded } from '../embedded';

const NotImplemented = () => new Error('This mock API is not implemented');

export const HuwelijksplannerAPI: HuwelijksplannerInterface = {
  getProducten: () => Promise.resolve(resolveEmbedded(productenJSON.results as any)),

  getAccommodations: () => Promise.resolve(resolveEmbedded([])),

  getAssents: () => Promise.resolve(resolveEmbedded(assentsJSON as any)),

  deleteAssent: (_data: Assent) => Promise.reject(NotImplemented()),

  putAssent: (_data: Assent) => Promise.reject(NotImplemented()),

  declineAssent: (_assent: Assent) => Promise.reject(NotImplemented()),

  grantAssent: (_assent: Assent) => Promise.reject(NotImplemented()),

  getHuwelijken: () => Promise.resolve(resolveEmbedded(huwelijkenJSON.results) as any),

  getHuwelijk: (findId) =>
    Promise.resolve(resolveEmbedded(huwelijkenJSON.results).find(({ id }) => id === findId) as any),

  deleteHuwelijk: (_huwelijk: Huwelijk) => Promise.reject(NotImplemented()),

  getKlanten: () => Promise.resolve(resolveEmbedded(klantenJSON) as any),

  getKlant: (uuid) => Promise.resolve(klantenJSON.find(({ id }) => id === uuid) as any),

  getAvailability: ({ interval = 'PT1H' } = {}) =>
    interval === 'PT1H'
      ? Promise.resolve(agendaJSON).then((data) => Object.values(data) as any)
      : Promise.reject(NotImplemented()),
};
