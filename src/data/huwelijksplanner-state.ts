import { Huwelijk } from '../generated';

export interface BSN {
  bsn: string;
}

export interface Name {
  name: string;
}
export interface ID {
  id: string;
}
export interface PartnerType {
  partner?: boolean;
}

export interface GivenName {
  'given-name': string;
}

export interface FamilyName {
  'family-name': string;
}

export interface FamilyNamePrefix {
  'family-name-prefix': string;
}

export interface DateOfBirth {
  bday: string;
}

export interface PlaceOfBirth {
  'place-of-birth': string;
}

export interface CountryOfBirth {
  'country-of-birth': string;
}

export interface Street {
  street: string;
}

export interface HouseNumber {
  'house-number': string;
}
export interface HouseLetter {
  'house-number-letter': string;
}
export interface HouseNumberSuffix {
  'house-number-suffix': string;
}
export interface PostalCode {
  'postal-code': string;
}
export interface PlaceOfResidence {
  'place-of-residence': string;
}
export interface CountryOfResidence {
  'country-of-residence': string;
}
export interface Nationality {
  nationality: string;
}
export interface TelephoneNumber {
  tel: string;
}
export interface Email {
  email: string;
}
export interface Salutation {
  salutation: string;
}

export interface IndicatieCurateleRegister {
  'indicatie-curateleregister': number;
}

export interface Invitee
  extends Email,
    Name,
    Partial<BSN>,
    Partial<DateOfBirth>,
    Partial<PlaceOfResidence>,
    Partial<Street>,
    Partial<HouseNumber>,
    Partial<HouseLetter>,
    Partial<HouseNumberSuffix>,
    Partial<PostalCode>,
    Partial<PlaceOfResidence>,
    Partial<CountryOfResidence> {}

// TODO:
// Indicatie curateleregister
// Burgerlijke staat
//

type DeclarationCheckboxList = {
  unmarried?: boolean;
  'not-marrying-relative'?: boolean;
  'correct-information-and-complete'?: boolean;
};

export interface HuwelijksplannerPartner
  extends Partial<BSN>,
    Partial<Name>,
    Partial<ID>,
    Partial<PartnerType>,
    Partial<GivenName>,
    Partial<FamilyName>,
    Partial<FamilyNamePrefix>,
    Partial<DateOfBirth>,
    Partial<PlaceOfResidence>,
    Partial<Street>,
    Partial<HouseNumber>,
    Partial<HouseLetter>,
    Partial<HouseNumberSuffix>,
    Partial<PostalCode>,
    Partial<PlaceOfResidence>,
    Partial<CountryOfResidence>,
    Partial<Nationality>,
    Partial<PlaceOfBirth>,
    Partial<CountryOfBirth>,
    Partial<TelephoneNumber>,
    Partial<Email>,
    Partial<Salutation>,
    Partial<IndicatieCurateleRegister> {
  contact: { voornaam: string; achternaam: string };
  _self: { id: string };
  'marital-status'?: string;
  'declaration-checkbox-list'?: DeclarationCheckboxList;
  'verified-invitation-email'?: boolean;
}

export interface Reservation {
  expiry?: string;
  'ceremony-id'?: string;
  'ceremony-type': string;
  'ceremony-start': string;
  'ceremony-end': string;
  'ceremony-location': string;
  'ceremony-price-currency'?: string;
  'ceremony-price-amount'?: string;
}

interface Witness extends Invitee {
  id: string;
}

export interface HuwelijkWithId extends Huwelijk {
  _id: string;
}

export type RegistrationType = 'huwelijk' | 'partnerschap';

export interface HuwelijksplannerState {
  acceptWitnessEndDate?: string;
  ambtenaar?: string;
  canInviteWitnesses?: boolean;
  canOrderProducts?: boolean;
  cancelable?: boolean;
  cancelled?: boolean;
  id?: string;
  inviteWitnessEndDate?: string;
  maxWitnessPerPartner: number;
  minWitnessBday?: string;
  minWitnessPerPartner: number;
  orderProductEndDate?: string;
  partnerInvitation?: Invitee;
  partners: HuwelijksplannerPartner[];
  productId?: string;
  'registration-type'?: RegistrationType;
  reservation?: Reservation;
  witnesses: Witness[];
}

export type HuwelijksplannerInput = Partial<HuwelijksplannerState>;

export const initialState: HuwelijksplannerState = {
  partners: [],
  witnesses: [],
  minWitnessPerPartner: 1,
  maxWitnessPerPartner: 2,
};
