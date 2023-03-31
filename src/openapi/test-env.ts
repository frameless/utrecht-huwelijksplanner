export type { Assent } from '../generated';

import { HuwelijksplannerInterface } from './api-interface';
import { resolveEmbedded } from '../embedded';
import { Assent, AvailabilityService } from '../generated';
import {
  AccommodationService,
  Assent as AssentNamespace,
  AssentService,
  Huwelijk,
  HuwelijkService,
  Klant,
  KlantService,
  SDGProduct,
  SdgproductService,
} from '../generated';

const MissingIdError = () => new TypeError('Argument must have `id` property');

const putAssent = (data: Assent) =>
// @ts-ignore
  data.id ? AssentService.assentPutItem(data.id, data) : Promise.reject(MissingIdError());

export const HuwelijksplannerAPI: HuwelijksplannerInterface = {
  getProducten: () =>
    SdgproductService.sdgproductGetCollection().then((data): SDGProduct[] => resolveEmbedded(data.results || [])),


  getAccommodations: () =>
  // @ts-ignore
    AccommodationService.accommodationGetCollection().then((data) => resolveEmbedded(data.results || [])),

    // @ts-ignore
  getAssents: () => AssentService.assentGetCollection().then((data): Assent[] => resolveEmbedded(data.results || [])),

  deleteAssent: (data: Assent) =>
  // @ts-ignore
    data.id ? AssentService.assentDeleteItem(data.id) : Promise.reject(MissingIdError()),

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

  getHuwelijk: (id: string) => HuwelijkService.huwelijkGetItem(id).then((data): Huwelijk => resolveEmbedded(data)),

  getHuwelijken: () =>
    HuwelijkService.huwelijkGetCollection().then((data): Huwelijk[] => resolveEmbedded(data.results || [])),

    // @ts-ignore
  deleteHuwelijk: (huwelijk: Huwelijk) => HuwelijkService.huwelijkDeleteItem(huwelijk.id || ''),

  getKlanten: () => KlantService.klantGetCollection().then((data) => resolveEmbedded(data.results)),

  getKlant: (uuid: string): Promise<Klant> => KlantService.klantGetItem(uuid),

  getAvailability: () => AvailabilityService.availabilityGetCollection().then((data) => data.results || []),
};
