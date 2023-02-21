export type { Assent } from '../../src/generated/openapi/Overige-Objecten';
export type { Accomodation } from '../../src/generated/openapi/Overige-Objecten';
export type { SDG as Product } from '../../src/generated/openapi/Overige-Objecten';
export type { huwelijk as Huwelijk } from '../../src/generated/openapi/trouwservice';
export type { Klant } from '../generated/openapi/klanten';
import { Assent as AssentNamespace } from '../../src/generated/openapi/Overige-Objecten';
import type { Assent } from '../../src/generated/openapi/Overige-Objecten';
import type { SDG as Product } from '../../src/generated/openapi/Overige-Objecten';
import type { huwelijk as Huwelijk } from '../../src/generated/openapi/trouwservice';
import { DefaultService as TrouwService } from '../../src/generated/openapi/trouwservice/services/DefaultService';
import { resolveEmbedded } from '../embedded';
import { DefaultService as AgendaService } from '../generated/openapi/Agenda-Service';
import { DefaultService as OverigeObjecten } from '../generated/openapi/Overige-Objecten/services/DefaultService';
import type { Klant } from '../generated/openapi/klanten';
import { KlantenService } from '../generated/openapi/klanten';
import { HuwelijksplannerInterface } from './api-interface';

const MissingIdError = () => new TypeError('Argument must have `id` property');

const putAssent = (data: Assent) =>
  data.id ? OverigeObjecten.putAssentsId(data.id, data) : Promise.reject(MissingIdError());

export const HuwelijksplannerAPI: HuwelijksplannerInterface = {
  getProducten: () => OverigeObjecten.getProducten().then((data): Product[] => resolveEmbedded(data.results || [])),

  getAccommodations: () => OverigeObjecten.getAccommodations().then((data) => resolveEmbedded(data.results || [])),

  getAssents: () => OverigeObjecten.getAssents().then((data): Assent[] => resolveEmbedded(data.results || [])),

  deleteAssent: (data: Assent) =>
    data.id ? OverigeObjecten.deleteAssentsId(data.id) : Promise.reject(MissingIdError()),

  putAssent,

  declineAssent: (assent: Assent) =>
    putAssent({
      ...assent,
      status: AssentNamespace.status.DECLINED,
    }),

  grantAssent: (assent: Assent) =>
    putAssent({
      ...assent,
      status: AssentNamespace.status.GRANTED,
    }),

  getHuwelijk: (id: string) => TrouwService.getHuwelijkenId(id).then((data): Huwelijk => resolveEmbedded(data)),

  getHuwelijken: () => TrouwService.getHuwelijken().then((data): Huwelijk[] => resolveEmbedded(data.results || [])),

  deleteHuwelijk: (huwelijk: Huwelijk) => TrouwService.deleteHuwelijkenId(huwelijk.id || ''),

  getKlanten: () => KlantenService.klantList().then((data) => resolveEmbedded(data.results)),

  getKlant: (uuid: string): Promise<Klant> => KlantenService.klantRead(uuid),

  getAvailability: ({ interval = 'PT1H', start = undefined, stop = undefined } = {}) => {
    console.log(interval, start, stop);
    return AgendaService.getAvailabilities().then((data) => data.results || []);

    // AgendaService.getAvailabilities(interval, start, stop),
  },
};
