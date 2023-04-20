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
  'marital-status'?: string;
  'declaration-checkbox-list'?: DeclarationCheckboxList;
  'verified-invitation-email'?: boolean;
}

export interface Reservation {
  expiry: string;
  'ceremony-type': string;
  'ceremony-start': string;
  'ceremony-end': string;
  'ceremony-location': string;
  'ceremony-price-currency': string;
  'ceremony-price-amount': string;
}

interface Witness extends Invitee {
  id: string;
}

export type RegistrationType = 'huwelijk' | 'geregistreerd-partnerschap';

export type CeremonyType =
  | 'eenvoudig-huwelijk'
  | 'flits-balie-huwelijk'
  | 'geregistreerd-partnerschap'
  | 'uitgebreid-huwelijk';

export interface TODO {
  partnerInvitation?: Invitee;
  partners: HuwelijksplannerPartner[];
  witnesses: Witness[];
  'ceremony-type'?: CeremonyType;
  'ceremony-location'?: string;
  'ceremony-start'?: string;
  'ceremony-end'?: string;
  'ceremony-price'?: string;
  'registration-type'?: RegistrationType;
  reservation?: Reservation;
  cancelled?: boolean;
  cancelable?: boolean;
  canOrderProducts?: boolean;
  canInviteWitnesses?: boolean;
  minWitnessBday?: string;
  minWitnessPerPartner: number;
  maxWitnessPerPartner: number;
  inviteWitnessEndDate?: string;
  acceptWitnessEndDate?: string;
  orderProductEndDate?: string;
}

export type HuwelijksplannerState = TODO;

export type HuwelijksplannerInput = Partial<TODO>;

export const initialState: HuwelijksplannerState = {
  partners: [],
  witnesses: [],
  minWitnessPerPartner: 1,
  maxWitnessPerPartner: 2,
};

export const exampleState: HuwelijksplannerState = {
  ...initialState,
  partnerInvitation: {
    name: 'Sanne van den Broecke',
    email: 'sanne.vandenbroecke@live.com',
  },
  partners: [
    {
      id: 'EC4D6AEF-0E23-4686-8778-71D2C02D7A38',
      name: 'Anne Nico Johannes',
      'given-name': 'Anne Nico Johannes',
      'family-name': 'Deursen',
      'family-name-prefix': '',
      bday: '1988-06-10',
      bsn: '185001943',
      email: 'anne.deursen@gmail.com',
      tel: '030 2434257',
      'postal-code': '3582JH',
      'house-number': '127',
      'house-number-letter': '',
      'house-number-suffix': 'achterste voren',
      street: 'Rubenslaan',
      'place-of-residence': 'Utrecht',
      'place-of-birth': 'Arnhem',
      nationality: 'Nederlandse',
      'country-of-birth': 'Nederland',
      salutation: 'De heer',
      'indicatie-curateleregister': 0,
      'marital-status': 'Ongehuwd en nooit gehuwd geweest',
    },
    {
      id: '67EEFC1C-A28A-43E7-8950-76C289E905C7',
      name: 'Sanne van den Broecke',
      'given-name': 'Sanne',
      'family-name': 'Broecke',
      'family-name-prefix': 'van den',
      bday: '1988-10-13',
      bsn: '193341437',
      email: 'sanne.vandenbroecke@live.com',
      tel: '06 27923411',
      'postal-code': '3582JH',
      'house-number': '127',
      'house-number-letter': '',
      'house-number-suffix': 'achterste voren',
      street: 'Rubenslaan',
      'place-of-residence': 'Utrecht',
      'country-of-birth': 'Nederland',
      'place-of-birth': 'Apeldoorn',
      nationality: 'Nederlandse',
      salutation: 'Mevrouw',
      'indicatie-curateleregister': 0,
      'marital-status': 'Ongehuwd en nooit gehuwd geweest',
      partner: true,
    },
  ],
  reservation: {
    expiry: 'FIXME: over 2 uur',
    'ceremony-type': 'Eenvoudig huwelijk',
    'ceremony-start': '2021-04-14T09:00+01:00',
    'ceremony-end': '2021-04-14T09:10+01:00',
    'ceremony-location': 'Locatie Stadskantoor',
    'ceremony-price-currency': 'EUR',
    'ceremony-price-amount': '168',
  },
  'registration-type': 'huwelijk',
  'ceremony-type': 'eenvoudig-huwelijk',
  'ceremony-start': '2021-04-14T09:00+01:00',
  'ceremony-end': '2021-04-14T09:10+01:00',
  'ceremony-location': 'Locatie Stadskantoor',
  'ceremony-price': 'EUR 168',
  witnesses: [
    {
      id: 'd79c67b8-fa97-49e8-b177-679594cb95c4',
      name: 'Jip Schmidt',
      email: 'jip@example.com',
    },
    {
      id: '2586fcba-fba0-4ca1-bb4c-a9b7fbbb1986',
      name: 'Janneke Westendorp',
      email: 'janneke@example.com',
    },
    {
      id: '410ee2cb-2c02-4d3a-afaf-69b45c03fde4',
      name: 'Joost Jansen',
      email: 'joost@example.com',
    },
    {
      id: '4b9fdbd9-ccf2-48c5-8157-cc7df7d697cc',
      name: 'Judith Jongejan',
      email: 'judith@example.com',
    },
  ],
  minWitnessBday: new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString(),
  inviteWitnessEndDate: '2021-03-31T23:59:59+01:00',
  acceptWitnessEndDate: '2021-03-31T23:59:59+01:00',
  orderProductEndDate: '2021-03-31T23:59:59+01:00',
  canInviteWitnesses: true,
  canOrderProducts: true,
  cancelled: false,
  cancelable: true,
};

export interface CalendarEvent {
  id: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
}
export const exampleEventsFlitsBalieHuwelijk = [
  {
    id: 'bf8f79a4-4f19-4536-bf18-28431bd65d55',
    location: 'Stadskantoor',
    startDateTime: '2021-03-10T10:00Z',
    endDateTime: '2021-03-10T10:15Z',
  },
  {
    id: 'dea13140-b931-43a9-99de-6f73aa1cbdad',
    location: 'Stadskantoor',
    startDateTime: '2021-03-26T10:00Z',
    endDateTime: '2021-03-26T10:15Z',
  },
  {
    id: '14b4339c-0003-437a-bf92-54db2867635c',
    location: 'Stadskantoor',
    startDateTime: '2021-04-05T10:00Z',
    endDateTime: '2021-04-05T10:15Z',
  },
  {
    id: '11bfce6c-c890-4e9b-b08e-61368511c3fa',
    location: 'Stadskantoor',
    startDateTime: '2021-04-13T10:00Z',
    endDateTime: '2021-04-13T10:15Z',
  },
  {
    id: 'baaf9d08-1e24-45ec-9aa4-22509578289e',
    location: 'Stadskantoor',
    startDateTime: '2021-04-14T10:00Z',
    endDateTime: '2021-04-14T10:15Z',
  },
  {
    id: 'f191273b-3575-42a8-876b-cbe36a8e9b11',
    location: 'Stadskantoor',
    startDateTime: '2021-04-14T11:30Z',
    endDateTime: '2021-04-14T11:45Z',
  },
  {
    id: '82b4510c-2491-4cc4-96b1-1847fa21c0ad',
    location: 'Stadskantoor',
    startDateTime: '2021-04-16T10:00Z',
    endDateTime: '2021-04-16T10:15Z',
  },
  {
    id: '36553876-7117-4432-8913-d6069da6578b',
    location: 'Stadskantoor',
    startDateTime: '2021-04-21T10:00Z',
    endDateTime: '2021-04-21T10:15Z',
  },
  {
    id: 'f87c2edf-1d74-48e9-8583-3d032c0999dc',
    location: 'Stadskantoor',
    startDateTime: '2021-04-27T10:00Z',
    endDateTime: '2027-04-21T10:15Z',
  },
  {
    id: '4fde4c55-359f-488c-83b9-7801f18aa0a0',
    location: 'Stadskantoor',
    startDateTime: '2021-04-28T10:00Z',
    endDateTime: '2021-04-28T10:15Z',
  },
  {
    id: 'b928b625-2293-451c-be2b-8131555d7479',
    location: 'Stadskantoor',
    startDateTime: '2021-04-30T10:00Z',
    endDateTime: '2021-04-30T10:15Z',
  },

  {
    id: '1fe9bdfa-ced5-11ed-afa1-0242ac120002    ',
    location: 'Stadskantoor',
    startDateTime: '2023-03-30T10:00Z',
    endDateTime: '2023-03-30T10:15Z',
  },
  {
    id: '1fe9c368-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-03-30T11:00Z',
    endDateTime: '2023-03-30T11:15Z',
  },
  {
    id: '1fe9c57a-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-03-31T13:00Z',
    endDateTime: '2023-03-31T13:15Z',
  },
  {
    id: '1fe9c6d8-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-01T07:15Z',
    endDateTime: '2023-04-01T07:30Z',
  },
  {
    id: '1fe9c87c-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-03T10:00Z',
    endDateTime: '2023-04-03T10:15Z',
  },
  {
    id: '1fe9ca0c-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-01T11:30Z',
    endDateTime: '2023-04-01T11:45Z',
  },
  {
    id: '1fe9cb38-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-02T10:45Z',
    endDateTime: '2023-04-02T11:00Z',
  },
  {
    id: '1fe9cc6e-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-03T10:00Z',
    endDateTime: '2023-04-03T10:15Z',
  },
  {
    id: '1fe9d088-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-03T09:00Z',
    endDateTime: '2023-04-03T09:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-05T14:15Z',
    endDateTime: '2023-04-05T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-05T10:00Z',
    endDateTime: '2023-04-05T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-06T14:15Z',
    endDateTime: '2023-04-06T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-06T10:00Z',
    endDateTime: '2023-04-06T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-07T14:15Z',
    endDateTime: '2023-04-07T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-07T10:00Z',
    endDateTime: '2023-04-07T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-08T14:15Z',
    endDateTime: '2023-04-08T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-08T10:00Z',
    endDateTime: '2023-04-08T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-09T14:15Z',
    endDateTime: '2023-04-09T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-09T10:00Z',
    endDateTime: '2023-04-09T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-10T14:15Z',
    endDateTime: '2023-04-10T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-10T10:00Z',
    endDateTime: '2023-04-10T10:15Z',
  },
  {
    id: '1fe9d2fe-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-11T14:15Z',
    endDateTime: '2023-04-11T14:30Z',
  },
  {
    id: '1fe9d448-ced5-11ed-afa1-0242ac120002',
    location: 'Stadskantoor',
    startDateTime: '2023-04-11T10:00Z',
    endDateTime: '2023-04-11T10:15Z',
  },
];

export const calendars = {
  'flits-balie-huwelijk': exampleEventsFlitsBalieHuwelijk,
  'uitgebreid-huwelijk': [
    {
      id: 'a6f6fb95-b1fa-4056-bf40-e9c7d6189420',
      location: '',
      startDateTime: '2021-04-14T10:00Z',
      endDateTime: '2021-04-14T10:15Z',
    },
  ],
};
