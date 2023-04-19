import { HuwelijksplannerInterface } from './api-interface';
import { resolveEmbedded } from '../embedded';
import {
  AccommodationService,
  Assent,
  AssentService,
  AvailabilityService,
  Huwelijk,
  HuwelijkService,
  Klant,
  KlantService,
  SDGProduct,
  SdgproductService,
} from '../generated';

const MissingIdError = () => new TypeError('Argument must have `id` property');

const putAssent = (data: Assent) =>
  data.id ? AssentService.assentPutItem(data.id, data) : Promise.reject(MissingIdError());

export const HuwelijksplannerAPI: HuwelijksplannerInterface = {
  getProducten: () =>
    SdgproductService.sdgproductGetCollection().then((data): SDGProduct[] => resolveEmbedded(data.results || [])),

  getAccommodations: () =>
    AccommodationService.accommodationGetCollection('').then((data) => resolveEmbedded(data.results || [])),

  getAssents: () =>
    AssentService.assentGetCollection('', '').then((data): Assent[] => resolveEmbedded(data.results || [])),

  deleteAssent: (data: Assent) =>
    data.id ? AssentService.assentDeleteItem(data.id) : Promise.reject(MissingIdError()),

  putAssent,

  declineAssent: (assent: Assent) =>
    putAssent({
      ...assent,
      status: Assent.status.DECLINED,
    }),

  grantAssent: (assent: Assent) =>
    putAssent({
      ...assent,
      status: Assent.status.GRANTED,
    }),

  getHuwelijk: (id: string) => HuwelijkService.huwelijkGetItem(id).then((data): Huwelijk => resolveEmbedded(data)),

  getHuwelijken: () =>
    HuwelijkService.huwelijkGetCollection().then((data): Huwelijk[] => resolveEmbedded(data.results || [])),

  deleteHuwelijk: (huwelijk: Huwelijk) => HuwelijkService.huwelijkDeleteItem(huwelijk.id || ''),

  getKlanten: () => KlantService.klantGetCollection().then((data) => resolveEmbedded(data.results)),

  getKlant: (uuid: string): Promise<Klant> => KlantService.klantGetItem(uuid),

  getAvailability: () => AvailabilityService.availabilityGetCollection().then((data) => data.results || []),
};
