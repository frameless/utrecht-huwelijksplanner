export type {Assent} from "../generated";

import { HuwelijksplannerInterface } from './api-interface';
import { resolveEmbedded } from '../embedded';
import type { Assent } from "../generated";
import { AccommodationService, Assent as AssentNamespace, AssentService, CalendarService, Huwelijk, HuwelijkService, Klant, KlantService, SDGProduct, SdgproductService  } from "../generated";

const MissingIdError = () => new TypeError('Argument must have `id` property');

const putAssent = (data: Assent) =>
  data.id ? AssentService.assentPut(data.id, data) : Promise.reject(MissingIdError());

export const HuwelijksplannerAPI: HuwelijksplannerInterface = {
  getProducten: () => SdgproductService.getProducten().then((data): SDGProduct[] => resolveEmbedded(data.results || [])),

  getAccommodations: () => AccommodationService.getAccommodations().then((data) => resolveEmbedded(data.results || [])),

  getAssents: () => AssentService.getAssents().then((data): Assent[] => resolveEmbedded(data.results || [])),

  deleteAssent: (data: Assent) =>
    data.id ? AssentService.deleteAssentsId(data.id) : Promise.reject(MissingIdError()),

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

  getHuwelijk: (id: string) => HuwelijkService.huwelijkGet(id).then((data): Huwelijk => resolveEmbedded(data)),

  getHuwelijken: () => HuwelijkService.getHuwelijken().then((data): Huwelijk[] => resolveEmbedded(data.results || [])),

  deleteHuwelijk: (huwelijk: Huwelijk) => HuwelijkService.huwelijkDelete(huwelijk.id || ''),

  getKlanten: () => KlantService.klantList().then((data) => resolveEmbedded(data.results)),

  getKlant: (uuid: string): Promise<Klant> => KlantService.klantRead(uuid),

  getAvailability: () => CalendarService.getAvailabilities().then((data) => data.results || []),
};
