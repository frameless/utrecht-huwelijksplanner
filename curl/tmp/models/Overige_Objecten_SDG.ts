/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Overige_Objecten_SDGLocatie } from './Overige_Objecten_SDGLocatie';
import type { Overige_Objecten_SDGVertaling } from './Overige_Objecten_SDGVertaling';

export type Overige_Objecten_SDG = {
  uuid?: string;
  upnLabel?: string;
  upnUri?: string;
  versie?: string;
  publicatieDatum?: string;
  productAanwezig?: boolean;
  productValtOnder?: string;
  verantwoordelijkeOrganisatie?: Overige_Objecten_SDGLocatie;
  bevoegdeOrganisatie?: Overige_Objecten_SDGLocatie;
  catalogus?: string;
  locaties?: Array<any>;
  doelgroep?: string;
  vertalingen?: Array<Overige_Objecten_SDGVertaling>;
  gerelateerdeProducten?: Array<Overige_Objecten_SDG>;
};
